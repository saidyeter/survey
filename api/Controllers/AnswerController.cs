using Microsoft.AspNetCore.Mvc;
using SurveyApi.DataAccess;
using SurveyApi.DataAccess.Entities;
using SurveyApi.Models.DTOs;

namespace SurveyApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AnswerController : ControllerBase
{
    private readonly ILogger<AnswerController> logger;
    private readonly SurveyDbContext dbContext;

    public AnswerController(ILogger<AnswerController> logger, SurveyDbContext dbContext)
    {
        this.logger = logger;
        this.dbContext = dbContext;
    }


    [HttpPost("{ticket}")]
    public async Task<IActionResult> SubmitAnswers(string ticket, SubmitAnswersReq val)
    {
        if (string.IsNullOrWhiteSpace(ticket))
        {
            return Unauthorized();
        }

        var participation = dbContext.Participations
            .Where(x => x.ParticipationTicket == ticket)
            .FirstOrDefault();

        if (participation is null)
        {
            logger.LogInformation("No Participations found ({ticket})", ticket);
            return Unauthorized();
        }

        if (participation.EndDate != null)
        {
            logger.LogInformation("The participation already finished the survey ({ticket})", ticket);
            return Unauthorized();
        }

        var survey = dbContext.Surveys
            .Where(x => x.Id == participation.SurveyId)
            .FirstOrDefault();

        if (survey is null || survey.Status != SurveyStatus.Running)
        {
            logger.LogInformation("No Surveys found ({ticket})", ticket);
            dbContext.Participations.Remove(participation);
            await dbContext.SaveChangesAsync();
            return Unauthorized();
        }

        var respondedQuestionIdList = dbContext
            .ParticipantAnswers
            .Where(x => x.ParticipationId == participation.Id)
            .Select(x => x.QuestionId)
            .ToList();

        var filteredAnswers = val.Answers
            .Where(a => !respondedQuestionIdList.Contains(a.QuestionId))
            .ToList();

        if (filteredAnswers.Count == 0)
        {
            logger.LogInformation("These questions are already answered");
            return Ok();
        }
        var lastQuestion = dbContext.Questions
            .Where(q => q.SurveyId == survey.Id)
            .OrderByDescending(x => x.OrderNumber)
            .FirstOrDefault();

        if (respondedQuestionIdList.Contains(lastQuestion?.Id ?? -1) ||
            filteredAnswers.Any(x => x.QuestionId == (lastQuestion?.Id ?? -1)))
        {
            participation.EndDate = DateTime.Now;
            dbContext.Update(participation);
        }

        await dbContext.AddRangeAsync(filteredAnswers.Select(i => i.ToParticipantAnswer(participation.Id)));
        await dbContext.SaveChangesAsync();

        return Ok();
    }
}