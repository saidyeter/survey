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

        var orderNumber = dbContext.Questions
            .Where(x => x.SurveyId == currentSurvey.Id)
            .Count() + 1;

        var data = val.ToDbModel(currentSurvey.Id, orderNumber);
        await dbContext.Questions.AddAsync(data);
        await dbContext.SaveChangesAsync();
        await dbContext.Answers.AddRangeAsync(val.Answers.Select(a => a.ToDbModel(data.Id)));
        await dbContext.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("update/{id}")]
    public async Task<IActionResult> UpdateQuestion(int id, AddQuestionReq val)
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

        var question = await dbContext.Questions
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();
        if (question is null)
        {
            logger.LogInformation("No question is found by {id} id", id);
            return BadRequest();
        }

        question.Text = val.Text;
        question.DescriptiveAnswer = val.DescriptiveAnswer;
        question.Required = val.IsRequired;
        question.AnswerType =
            val.AnswerType == "single" ? AnswerType.Single :
            val.AnswerType == "multiple" ? AnswerType.Multiple :
            throw new Exception("Unexpected AnswerType: " + val.AnswerType);
        dbContext.Update(question);

        var answers = dbContext.Answers.Where(a => a.QuestionId == question.Id).ToList();
        dbContext.RemoveRange(answers);
        await dbContext.SaveChangesAsync();

        await dbContext.Answers.AddRangeAsync(val.Answers.Select(a => a.ToDbModel(question.Id)));
        await dbContext.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("update-on-running/{id}")]
    public async Task<IActionResult> UpdateOnRunningQuestion(int id, UpdateOnRunningQuestionReq val)
    {
        var question = await dbContext.Questions
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
        if (question is null)
        {
            logger.LogInformation("No question found with {id} id", id);
            return BadRequest();
        }

        var answers = await dbContext.Answers
            .Where(a => a.QuestionId == id)
            .ToListAsync();

        if (answers.Count == 0)
        {
            logger.LogError("There is no answer for this question with {id} id", id);
            throw new Exception($"There is no answer for this question with {id} id");
        }

        question.Text = val.Text;
        question.Required = val.Required;
        foreach (var item in answers)
        {
            var fromReq = val.Answers.Where(a => a.Id == item.Id).SingleOrDefault();
            if (fromReq is null)
            {
                logger.LogInformation("No answer found with {id} id in request", id);
                return BadRequest();
            }
            item.Text = fromReq.Text;
        }
        dbContext.Update(question);
        dbContext.UpdateRange(answers);
        await dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpGet("single/{id}")]
    public async Task<IActionResult> GetSingleQuestion(int id)
    {
        var qna = await dbContext.Questions
            .Where(x => x.Id == id)
            .Select(l => new
            {
                question = l,
                answers = dbContext.Answers.Where(a => a.QuestionId == l.Id).ToList()
            })
            .FirstOrDefaultAsync();

        return Ok(qna);
    }

    [HttpGet("{ticket}")]
    public async Task<IActionResult> GetQuestions(string ticket)
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

        var survey = dbContext.Questions
            .Where(x => x.SurveyId == requestedSurvey.Id)
            .Select(l => new
            {
                question = l,
                answers = dbContext.Answers.Where(a => a.QuestionId == l.Id).ToList()
            });

        var alreadyRespondedAnswers = dbContext.ParticipantAnswers.Where(x => x.ParticipationId == participation.Id).ToList();

        return Ok(new
        {
            survey,
            alreadyRespondedAnswers
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