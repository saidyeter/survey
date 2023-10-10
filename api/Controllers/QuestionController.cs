using Microsoft.AspNetCore.Mvc;
using SurveyApi.DataAccess;
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

    [HttpPost]
    public async Task<IActionResult> AddQuestion(AddQuestionReq val)
    {
        // validation

        var data = val.ToDbModel();
        await dbContext.Questions.AddAsync(data);
        await dbContext.SaveChangesAsync();
        return Ok(data);
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
            return Unauthorized();
        }

        var survey = dbContext.Surveys.Where(x => x.Id == participation.SurveyId).FirstOrDefault();
        if (survey is null || survey.EndDate < DateTime.Now)
        {
            dbContext.Participations.Remove(participation);
            await dbContext.SaveChangesAsync();
            return Unauthorized();
        }

        participation.StartDate = DateTime.Now;
        await dbContext.SaveChangesAsync();

        var questions = dbContext.Questions.Where(x => x.SurveyId == survey.Id);

        return Ok(new
        {
            questions
        });
    }
}