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

    [HttpGet("list")]
    public async Task<IActionResult> ParticipantList([FromQuery] int pageSize, [FromQuery] int pageNumber, [FromQuery] string search, [FromQuery] string orderColumn = "", [FromQuery] string orderDirection = "")
    {
        IQueryable<Participant> list;
        if (string.IsNullOrWhiteSpace(search))
        {
            list = dbContext.Participants;
        }
        else
        {
            list = dbContext.Participants
            .Where(u => u.Email.Contains(search) || u.Title.Contains(search));
        }

        var descending =
            orderDirection.ToLower() == "d" ||
            orderDirection.ToLower() == "desc" ||
            orderDirection.ToLower() == "descending";

        list = orderColumn.ToLower() switch
        {
            "email" => descending ?
                                list.OrderByDescending(p => p.Email) :
                                list.OrderBy(p => p.Email)
                                ,
            "city" => descending ?
                                list.OrderByDescending(p => p.City) :
                                list.OrderBy(p => p.City),
            "subcity" => descending ?
                                list.OrderByDescending(p => p.Subcity) :
                                list.OrderBy(p => p.Subcity),
            _ => descending ?
                                list.OrderByDescending(p => p.Title) :
                                list.OrderBy(p => p.Title),
        };

        var res = await list
            .Skip(pageSize * pageNumber)
            .Take(pageSize)
            .ToListAsync();

        if (res.Count == 0)
        {
            logger.LogInformation("No Participants found ({search})", search);
            return NotFound();
        }


        return Ok(new
        {
            list = res,
            nextPage = pageNumber + 1,
            pageSize = pageSize,
            totalCount = list.Count()
        });
    }


    [HttpGet("single/{id}")]
    public async Task<IActionResult> Participant(int id)
    {

        var res = await dbContext.Participants.Where(p => p.Id == id).FirstOrDefaultAsync();

        if (res is null)
        {
            logger.LogInformation("No Participant found ({id})", id);
            return NotFound();
        }

        return Ok(res);
    }


    [HttpPost("create")]
    public async Task<IActionResult> Create(NewPartipiciantDto val)
    {
        var data = val.Map();
        dbContext.Add(data);

        await dbContext.SaveChangesAsync();

        return Ok(data);
    }

    [HttpPost("edit/{id}")]
    public async Task<IActionResult> Edit(int id, NewPartipiciantDto val)
    {
        var d = await dbContext.Participants.Where(p => p.Id == id).FirstOrDefaultAsync();
        if (d is null)
        {
            return NotFound();
        }


        var data = val.Map(d);
        dbContext.Update(data);

        await dbContext.SaveChangesAsync();

        return Ok(data);
    }


    [HttpPost("remove/{id}")]
    public async Task<IActionResult> Remove(int id)
    {
        var res = await dbContext.Participants.Where(p => p.Id == id).FirstOrDefaultAsync();

        if (res is null)
        {
            return Ok();
        }

        dbContext.Remove(res);

        await dbContext.SaveChangesAsync();

        return Ok();
    }
}
