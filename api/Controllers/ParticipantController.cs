using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApi.DataAccess;
using SurveyApi.DataAccess.Entities;
using SurveyApi.Models.DTOs;
using System.Net;

namespace SurveyApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ParticipantController : ControllerBase
{
    private readonly ILogger<ParticipantController> logger;
    private readonly SurveyDbContext dbContext;
    private readonly IConfiguration configuration;

    public ParticipantController(ILogger<ParticipantController> logger, SurveyDbContext dbContext, IConfiguration configuration)
    {
        this.logger = logger;
        this.dbContext = dbContext;
        this.configuration = configuration;
    }


    [HttpPost("validate")]
    public async Task<IActionResult> ValidateParticipant(ValidateParticipantReq val)
    {
        var dbVal = await dbContext.Participants.Where(u => u.Email == val.Email).FirstOrDefaultAsync();
        if (dbVal is null)
        {
            return NotFound();
        }

        if (dbVal.LegalIdentifier[0] != val.CodePart[0] ||
            dbVal.LegalIdentifier[2] != val.CodePart[1])
        {
            return BadRequest();
        }
        var now = DateTime.Now;
        var activeSurvey = await dbContext.Surveys
            .Where(u => u.StartDate < now && (u.EndDate > now || u.EndDate == null))
            .FirstOrDefaultAsync();

        if (activeSurvey is null)
        {
            return BadRequest();
        }

        //return new ObjectResult("Your message") { StatusCode = 403 };

        var participation = new Participation
        {
            PartipiciantId = dbVal.Id,
            StartDate = DateTime.Now,
            ParticipationTicket = Guid.NewGuid().ToString().Replace("-", "").ToLower(),
            SurveyId = activeSurvey.Id
        };

        await dbContext.AddAsync(participation);
        await dbContext.SaveChangesAsync();

        return Ok(new
        {
            participation.ParticipationTicket,
        });
    }
}
