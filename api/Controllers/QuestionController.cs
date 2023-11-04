using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApi.DataAccess;
using SurveyApi.DataAccess.Entities;
using SurveyApi.Models.DTOs;

namespace SurveyApi.Controllers;

[ApiController]
[Route("[controller]")]
public class QuestionController : ControllerBase
{
    private readonly ILogger<QuestionController> logger;
    private readonly SurveyDbContext dbContext;

    public QuestionController(ILogger<QuestionController> logger, SurveyDbContext dbContext)
    {
        this.logger = logger;
        this.dbContext = dbContext;
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveQuestion(int id)
    {
        var currentQuestion = await dbContext.Questions.Where(q => q.Id == id).FirstOrDefaultAsync();
        if (currentQuestion is null)
        {
            return Ok();
        }

        var currentSurvey = await dbContext.Surveys
        .Where(x => x.Id == currentQuestion.SurveyId)
        .FirstOrDefaultAsync();

        if (currentSurvey is null)
        {
            logger.LogInformation("No Surveys found ({surveyId})", currentQuestion.SurveyId);
            return BadRequest();
        }
        if (currentSurvey.Status != SurveyStatus.Pre)
        {
            logger.LogInformation("Related survey is not suitable to remove a question ({surveyId})", currentQuestion.SurveyId);
            return BadRequest();
        }

        var allQuestions = await dbContext.Questions
              .Where(x => x.SurveyId == currentQuestion.SurveyId)
              .OrderBy(x => x.OrderNumber)
              .ToListAsync();

        // 10 sorudan 5.yi sildim
        foreach (var item in allQuestions)
        {
            if (item.OrderNumber <= currentQuestion.OrderNumber)
            {
                continue;
            }
            else
            {
                item.OrderNumber--;
            }
        }
        dbContext.UpdateRange(allQuestions);
        dbContext.Remove(currentQuestion);

        await dbContext.SaveChangesAsync();

        return Ok();
    }


    [HttpPost("lower-order/{id}")]
    public async Task<IActionResult> LowerDownQuestionOrder(int id)
    {
        var currentQuestion = await dbContext.Questions.Where(q => q.Id == id).FirstOrDefaultAsync();
        if (currentQuestion is null)
        {
            return BadRequest();
        }

        var currentSurvey = await dbContext.Surveys
            .Where(x => x.Id == currentQuestion.SurveyId)
            .FirstOrDefaultAsync();

        if (currentSurvey is null)
        {
            logger.LogInformation("No Surveys found ({surveyId})", currentQuestion.SurveyId);
            return BadRequest();
        }
        if (currentSurvey.Status != SurveyStatus.Pre)
        {
            logger.LogInformation("Related survey is not suitable to change question order ({surveyId})", currentQuestion.SurveyId);
            return BadRequest();
        }

        var nextQuestion = await dbContext.Questions
            .Where(x => x.SurveyId == currentQuestion.SurveyId && x.OrderNumber == currentQuestion.OrderNumber + 1)
            .FirstOrDefaultAsync();

        if (nextQuestion is null)
        {
            // currentQuestion zaten son sirada
            return Ok();
        }

        currentQuestion.OrderNumber = nextQuestion.OrderNumber;
        nextQuestion.OrderNumber = currentQuestion.OrderNumber - 1;

        dbContext.Update(nextQuestion);
        dbContext.Update(currentQuestion);
        await dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("raise-order/{id}")]
    public async Task<IActionResult> RaiseUpQuestionOrder(int id)
    {
        var currentQuestion = await dbContext.Questions.Where(q => q.Id == id).FirstOrDefaultAsync();
        if (currentQuestion is null)
        {
            return BadRequest();
        }

        var currentSurvey = await dbContext.Surveys
            .Where(x => x.Id == currentQuestion.SurveyId)
            .FirstOrDefaultAsync();

        if (currentSurvey is null)
        {
            logger.LogInformation("No Surveys found ({surveyId})", currentQuestion.SurveyId);
            return BadRequest();
        }

        if (currentSurvey.Status != SurveyStatus.Pre)
        {
            logger.LogInformation("Related survey is not suitable to change question order ({surveyId})", currentQuestion.SurveyId);
            return BadRequest();
        }

        var previousQuestion = await dbContext.Questions
            .Where(x => x.SurveyId == currentQuestion.SurveyId && x.OrderNumber == currentQuestion.OrderNumber - 1)
            .FirstOrDefaultAsync();

        if (previousQuestion is null)
        {
            // currentQuestion zaten ilk sirada
            return Ok();
        }

        previousQuestion.OrderNumber = currentQuestion.OrderNumber;
        currentQuestion.OrderNumber = previousQuestion.OrderNumber - 1;

        dbContext.Update(previousQuestion);
        dbContext.Update(currentQuestion);
        await dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> AddQuestion(AddQuestionReq val)
    {
        // validation
        var currentSurvey = dbContext.Surveys
          .Where(x => x.Status == SurveyStatus.Pre)
          .FirstOrDefault();

        if (currentSurvey is null)
        {
            logger.LogInformation("No pre survey found");
            return BadRequest();
        }

        var data = val.ToDbModel(currentSurvey.Id);
        await dbContext.Questions.AddAsync(data);
        await dbContext.SaveChangesAsync();
        await dbContext.Answers.AddRangeAsync(val.Answers.Select(a => a.ToDbModel(data.Id)));
        await dbContext.SaveChangesAsync();
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetQuestions([FromQuery] string ticket)
    {
        if (string.IsNullOrWhiteSpace(ticket))
        {
            return Unauthorized();
        }
        var participation = dbContext.Participations.Where(x => x.ParticipationTicket == ticket).FirstOrDefault();
        if (participation is null)
        {
            logger.LogInformation("No Participations found ({ticket})", ticket);
            return Unauthorized();
        }

        var requestedSurvey = dbContext.Surveys
            .Where(x => x.Id == participation.SurveyId)
            .FirstOrDefault();

        if (requestedSurvey is null || requestedSurvey.EndDate < DateTime.Now)
        {
            logger.LogInformation("No Surveys found ({ticket})", ticket);
            dbContext.Participations.Remove(participation);
            await dbContext.SaveChangesAsync();
            return Unauthorized();
        }

        participation.StartDate = DateTime.Now;
        await dbContext.SaveChangesAsync();

        //var survey= from q in dbContext.Questions
        //            join a in 
        var survey = dbContext.Questions
            .Where(x => x.SurveyId == requestedSurvey.Id)
            .Select(l => new
            {
                question = l,
                answers = dbContext.Answers.Where(a => a.QuestionId == l.Id).ToList()
            });

        return Ok(new
        {
            survey
        });
    }

    [HttpPost("copy-single-question/{questionId}")]
    public async Task<IActionResult> CopySingleQuestion(int questionId)
    {
        // validation
        if (questionId == 0)
        {
            logger.LogInformation("Invalid questionId ({questionId})", questionId);
            return BadRequest();
        }


        var currentSurvey = await dbContext.Surveys
          .Where(x => x.Status == SurveyStatus.Pre)
          .FirstOrDefaultAsync();

        if (currentSurvey is null)
        {
            logger.LogInformation("No pre survey found");
            return BadRequest();
        }

        var requestedQuestion = await dbContext.Questions
            .Where(x => x.Id == questionId)
            .FirstOrDefaultAsync();

        if (requestedQuestion is null)
        {
            logger.LogInformation("No question found ({questionId})", questionId);
            return BadRequest();
        }

        var orderNumber = dbContext.Questions
            .Where(x => x.SurveyId == currentSurvey.Id)
            .Count() + 1;

        requestedQuestion.OrderNumber = orderNumber;
        requestedQuestion.Id = 0;
        requestedQuestion.SurveyId = currentSurvey.Id;
        dbContext.Add(requestedQuestion);
        await dbContext.SaveChangesAsync();


        var answers = await dbContext.Answers
            .Where(x => x.QuestionId == questionId)
            .ToListAsync();

        foreach (var item in answers)
        {
            item.QuestionId = requestedQuestion.Id;
            item.Id = 0;
        }
        dbContext.AddRange(answers);
        await dbContext.SaveChangesAsync();

        return Ok();
    }
}