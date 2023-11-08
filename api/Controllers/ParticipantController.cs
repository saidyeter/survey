using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApi.DataAccess;
using SurveyApi.DataAccess.Entities;
using SurveyApi.Models.DTOs;
using System.Net;
using System.Net.Sockets;

namespace SurveyApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ParticipantController : ControllerBase
{
    private readonly ILogger<ParticipantController> logger;
    private readonly SurveyDbContext dbContext;

    public ParticipantController(ILogger<ParticipantController> logger, SurveyDbContext dbContext)
    {
        this.logger = logger;
        this.dbContext = dbContext;
    }


    [HttpPost("validate")]
    public async Task<IActionResult> ValidateParticipant(ValidateParticipantReq val)
    {
        var dbVal = await dbContext.Participants.Where(u => u.Email == val.Email).FirstOrDefaultAsync();
        if (dbVal is null)
        {
            logger.LogInformation("No Participants found ({email})", val.Email);
            return NotFound();
        }

        if (!dbVal.Code.ToLower().EndsWith(val.CodePart))
        {
            logger.LogInformation("Code does not match ({email}). Actual: {codepart}, expected:{code}", val.Email, val.CodePart, dbVal.Code);
            return BadRequest();
        }
        var now = DateTime.Now;
        var activeSurvey = await dbContext.Surveys
            .Where(u => u.StartDate < now && (u.EndDate > now || u.EndDate == null))
            .FirstOrDefaultAsync();

        if (activeSurvey is null)
        {
            logger.LogInformation("No active survey found ({email})", val.Email);
            return BadRequest();
        }

        var existingParticipation = dbContext.Participations.Where(x => x.PartipiciantId == dbVal.Id && x.SurveyId == activeSurvey.Id).FirstOrDefault();
        if (existingParticipation is not null)
        {
            if (existingParticipation.EndDate is null)
            {
                logger.LogInformation("ExistingParticipation is found ({email}). Returning already created ParticipationTicket", val.Email);
                return Ok(new
                {
                    existingParticipation.ParticipationTicket,
                });
            }
            else
            {
                logger.LogInformation("ExistingParticipation is found ({email}) and it is finished. Returning 208", val.Email);
                return new ObjectResult("already finished") { StatusCode = 208 };
            }
        }

        var participation = new Participation
        {
            PartipiciantId = dbVal.Id,
            StartDate = DateTime.Now,
            ParticipationTicket = Guid.NewGuid().ToString().Replace("-", "").ToLower(),
            SurveyId = activeSurvey.Id
        };

        await dbContext.AddAsync(participation);
        await dbContext.SaveChangesAsync();

        logger.LogInformation("New Participation is created ({email})", val.Email);

        return Ok(new
        {
            participation.ParticipationTicket,
        });
    }
}
