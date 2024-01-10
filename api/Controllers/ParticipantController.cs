using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApi.DataAccess;
using SurveyApi.DataAccess.Entities;
using SurveyApi.Models.DTOs;
using System.Linq;

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
            .Where(u => u.Email.Contains(search) ||
            u.Title.Contains(search) ||
            u.City.Contains(search) ||
            u.Code.Contains(search));
        }

        var descending =
            orderDirection.ToLower() == "d" ||
            orderDirection.ToLower() == "desc" ||
            orderDirection.ToLower() == "descending";

        list = orderColumn.ToLower() switch
        {
            "email" => descending ?
                                list.OrderByDescending(p => p.Email) :
                                list.OrderBy(p => p.Email),

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


    [HttpGet("download")]
    public async Task<IActionResult> Download([FromQuery] string search, [FromQuery] string orderColumn = "", [FromQuery] string orderDirection = "")
    {
        IQueryable<Participant> list;
        if (string.IsNullOrWhiteSpace(search))
        {
            list = dbContext.Participants;
        }
        else
        {
            list = dbContext.Participants
            .Where(u => u.Email.Contains(search) ||
            u.Title.Contains(search) ||
            u.City.Contains(search) ||
            u.Code.Contains(search));
        }

        var descending =
            orderDirection.ToLower() == "d" ||
            orderDirection.ToLower() == "desc" ||
            orderDirection.ToLower() == "descending";

        list = orderColumn.ToLower() switch
        {
            "email" => descending ?
                                list.OrderByDescending(p => p.Email) :
                                list.OrderBy(p => p.Email),

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
            .ToListAsync();

        if (res.Count == 0)
        {
            logger.LogInformation("No Participants found ({search})", search);
            return NotFound();
        }

        // Create a new workbook and worksheet
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Sheet1");

        // Set the header row
        worksheet.Cell(1, 1).Value = "Unvan";
        worksheet.Cell(1, 2).Value = "GLN Kodu";
        worksheet.Cell(1, 3).Value = "Şehir";

        // Populate the data
        int row = 2;
        foreach (var obj in res)
        {
            worksheet.Cell(row, 1).Value = obj.Title;
            worksheet.Cell(row, 2).Value = obj.Code;
            worksheet.Cell(row, 3).Value = obj.City;
            row++;
        }
        using var memoryStream = new MemoryStream();
        workbook.SaveAs(memoryStream);

        return Ok(memoryStream.ToArray());
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


    [HttpGet("list-who-voted-question")]
    public async Task<IActionResult> ParticipantListWhoVotedQuestion([FromQuery] int id, [FromQuery] int pageSize, [FromQuery] int pageNumber, [FromQuery] string search, [FromQuery] string orderColumn = "", [FromQuery] string orderDirection = "")
    {
        if (!dbContext.Questions.Any(x => x.Id == id))
        {
            logger.LogInformation("No question found by {id} id", id);
            return NotFound();
        }

        var participationIdList = await dbContext
            .ParticipantAnswers
            .Where(x => x.QuestionId == id)
            .Select(x => x.ParticipationId)
            .ToListAsync();

        var participantIdList = await dbContext
            .Participations
            .Where(x => participationIdList.Contains(x.Id))
            .Select(x => x.PartipiciantId)
            .ToListAsync();

        IQueryable<Participant> list = dbContext
            .Participants
            .Where(x => participantIdList.Contains(x.Id));

        if (!string.IsNullOrWhiteSpace(search))
        {
            list = list
            .Where(u => u.Email.Contains(search) ||
            u.Title.Contains(search) ||
            u.City.Contains(search) ||
            u.Code.Contains(search));
        }

        var descending =
            orderDirection.ToLower() == "d" ||
            orderDirection.ToLower() == "desc" ||
            orderDirection.ToLower() == "descending";

        list = orderColumn.ToLower() switch
        {
            "email" => descending ?
                                list.OrderByDescending(p => p.Email) :
                                list.OrderBy(p => p.Email),

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

        var res = list
            .Skip(pageSize * pageNumber)
            .Take(pageSize);

        if (!res.Any())
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


    [HttpGet("download-who-voted-question")]
    public async Task<IActionResult> DownloadWhoVotedQuestion([FromQuery] int id, [FromQuery] string search, [FromQuery] string orderColumn = "", [FromQuery] string orderDirection = "")
    {
        if (!dbContext.Questions.Any(x => x.Id == id))
        {
            logger.LogInformation("No question found by {id} id", id);
            return NotFound();
        }

        var participationIdList = await dbContext
            .ParticipantAnswers
            .Where(x => x.QuestionId == id)
            .Select(x => x.ParticipationId)
            .ToListAsync();

        var participantIdList = await dbContext
            .Participations
            .Where(x => participationIdList.Contains(x.Id))
            .Select(x => x.PartipiciantId)
            .ToListAsync();

        IQueryable<Participant> list = dbContext
            .Participants
            .Where(x => participantIdList.Contains(x.Id));

        if (!string.IsNullOrWhiteSpace(search))
        {
            list = list
            .Where(u => u.Email.Contains(search) ||
            u.Title.Contains(search) ||
            u.City.Contains(search) ||
            u.Code.Contains(search));
        }

        var descending =
            orderDirection.ToLower() == "d" ||
            orderDirection.ToLower() == "desc" ||
            orderDirection.ToLower() == "descending";

        list = orderColumn.ToLower() switch
        {
            "email" => descending ?
                                list.OrderByDescending(p => p.Email) :
                                list.OrderBy(p => p.Email),

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

        if (!list.Any())
        {
            logger.LogInformation("No Participants found ({search})", search);
            return NotFound();
        }

        // Create a new workbook and worksheet
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Sheet1");

        // Set the header row
        worksheet.Cell(1, 1).Value = "Unvan";
        worksheet.Cell(1, 2).Value = "GLN Kodu";
        worksheet.Cell(1, 3).Value = "Şehir";

        // Populate the data
        int row = 2;
        foreach (var obj in list)
        {
            worksheet.Cell(row, 1).Value = obj.Title;
            worksheet.Cell(row, 2).Value = obj.Code;
            worksheet.Cell(row, 3).Value = obj.City;
            row++;
        }
        using var memoryStream = new MemoryStream();
        workbook.SaveAs(memoryStream);

        return Ok(memoryStream.ToArray());
    }


    [HttpGet("list-who-voted-answer")]
    public async Task<IActionResult> ParticipantListWhoVotedAnswer([FromQuery] int id, [FromQuery] int pageSize, [FromQuery] int pageNumber, [FromQuery] string search, [FromQuery] string orderColumn = "", [FromQuery] string orderDirection = "")
    {
        if (!dbContext.Answers.Any(x => x.Id == id))
        {
            logger.LogInformation("No answer found by {id} id", id);
            return NotFound();
        }

        var participationIdList = await dbContext
            .ParticipantAnswers
            .Where(x => x.AnswerId == id)
            .Select(x => x.ParticipationId)
            .ToListAsync();

        var participantIdList = await dbContext
            .Participations
            .Where(x => participationIdList.Contains(x.Id))
            .Select(x => x.PartipiciantId)
            .ToListAsync();

        IQueryable<Participant> list = dbContext
            .Participants
            .Where(x => participantIdList.Contains(x.Id));

        if (!string.IsNullOrWhiteSpace(search))
        {
            list = list
            .Where(u => u.Email.Contains(search) ||
            u.Title.Contains(search) ||
            u.City.Contains(search) ||
            u.Code.Contains(search));
        }

        var descending =
            orderDirection.ToLower() == "d" ||
            orderDirection.ToLower() == "desc" ||
            orderDirection.ToLower() == "descending";

        list = orderColumn.ToLower() switch
        {
            "email" => descending ?
                                list.OrderByDescending(p => p.Email) :
                                list.OrderBy(p => p.Email),

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

        var res = list
            .Skip(pageSize * pageNumber)
            .Take(pageSize);

        if (!res.Any())
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

    [HttpGet("download-who-voted-answer")]
    public async Task<IActionResult> DownloadWhoVotedAnswer([FromQuery] int id, [FromQuery] string search, [FromQuery] string orderColumn = "", [FromQuery] string orderDirection = "")
    {
        if (!dbContext.Answers.Any(x => x.Id == id))
        {
            logger.LogInformation("No answer found by {id} id", id);
            return NotFound();
        }

        var participationIdList = await dbContext
            .ParticipantAnswers
            .Where(x => x.AnswerId == id)
            .Select(x => x.ParticipationId)
            .ToListAsync();

        var participantIdList = await dbContext
            .Participations
            .Where(x => participationIdList.Contains(x.Id))
            .Select(x => x.PartipiciantId)
            .ToListAsync();

        IQueryable<Participant> list = dbContext
            .Participants
            .Where(x => participantIdList.Contains(x.Id));

        if (!string.IsNullOrWhiteSpace(search))
        {
            list = list
            .Where(u => u.Email.Contains(search) ||
            u.Title.Contains(search) ||
            u.City.Contains(search) ||
            u.Code.Contains(search));
        }

        var descending =
            orderDirection.ToLower() == "d" ||
            orderDirection.ToLower() == "desc" ||
            orderDirection.ToLower() == "descending";

        list = orderColumn.ToLower() switch
        {
            "email" => descending ?
                                list.OrderByDescending(p => p.Email) :
                                list.OrderBy(p => p.Email),

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

        if (!list.Any())
        {
            logger.LogInformation("No Participants found ({search})", search);
            return NotFound();
        }

        // Create a new workbook and worksheet
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Sheet1");

        // Set the header row
        worksheet.Cell(1, 1).Value = "Unvan";
        worksheet.Cell(1, 2).Value = "GLN Kodu";
        worksheet.Cell(1, 3).Value = "Şehir";

        // Populate the data
        int row = 2;
        foreach (var obj in list)
        {
            worksheet.Cell(row, 1).Value = obj.Title;
            worksheet.Cell(row, 2).Value = obj.Code;
            worksheet.Cell(row, 3).Value = obj.City;
            row++;
        }
        using var memoryStream = new MemoryStream();
        workbook.SaveAs(memoryStream);

        return Ok(memoryStream.ToArray());
    }

    [HttpGet("list-who-voted-survey")]
    public async Task<IActionResult> ParticipantListWhoVotedSurvey([FromQuery] int id, [FromQuery] int pageSize, [FromQuery] int pageNumber, [FromQuery] string search, [FromQuery] string orderColumn = "", [FromQuery] string orderDirection = "")
    {
        var val = await dbContext.Surveys
           .Where(u => u.Id == id)
           .ToListAsync();

        if (val is null || val.Count == 0)
        {
            return NotFound();
        }
        if (val.Count > 1)
        {
            throw new Exception("There must be single survey");
        }
        var survey = val.First();

        var participantIdList = await dbContext
            .Participations
            .Where(x => x.SurveyId == survey.Id)
            .Select(x => x.PartipiciantId)
            .ToListAsync();

        IQueryable<Participant> list = dbContext
            .Participants
            .Where(x => participantIdList.Contains(x.Id));

        if (!string.IsNullOrWhiteSpace(search))
        {
            list = list
            .Where(u => u.Email.Contains(search) ||
            u.Title.Contains(search) ||
            u.City.Contains(search) ||
            u.Code.Contains(search));
        }

        var descending =
            orderDirection.ToLower() == "d" ||
            orderDirection.ToLower() == "desc" ||
            orderDirection.ToLower() == "descending";

        list = orderColumn.ToLower() switch
        {
            "email" => descending ?
                                list.OrderByDescending(p => p.Email) :
                                list.OrderBy(p => p.Email),

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

        var res = list
            .Skip(pageSize * pageNumber)
            .Take(pageSize);

        if (!res.Any())
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

    [HttpGet("download-who-voted-survey")]
    public async Task<IActionResult> DownloadParticipantListWhoVotedSurvey([FromQuery] int id, [FromQuery] string search, [FromQuery] string orderColumn = "", [FromQuery] string orderDirection = "")
    {

        var val = await dbContext.Surveys
        .Where(u => u.Id == id)
        .ToListAsync();

        if (val is null || val.Count == 0)
        {
            return NotFound();
        }
        if (val.Count > 1)
        {
            throw new Exception("There must be single  survey");
        }
        var survey = val.First();

        var participantIdList = await dbContext
            .Participations
            .Where(x => x.SurveyId == survey.Id)
            .Select(x => x.PartipiciantId)
            .ToListAsync();

        IQueryable<Participant> list = dbContext
            .Participants
            .Where(x => participantIdList.Contains(x.Id));

        if (!string.IsNullOrWhiteSpace(search))
        {
            list = list
            .Where(u => u.Email.Contains(search) ||
            u.Title.Contains(search) ||
            u.City.Contains(search) ||
            u.Code.Contains(search));
        }

        var descending =
            orderDirection.ToLower() == "d" ||
            orderDirection.ToLower() == "desc" ||
            orderDirection.ToLower() == "descending";

        list = orderColumn.ToLower() switch
        {
            "email" => descending ?
                                list.OrderByDescending(p => p.Email) :
                                list.OrderBy(p => p.Email),

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

        if (!list.Any())
        {
            logger.LogInformation("No Participants found ({search})", search);
            return NotFound();
        }

        // Create a new workbook and worksheet
        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Sheet1");

        // Set the header row
        worksheet.Cell(1, 1).Value = "Unvan";
        worksheet.Cell(1, 2).Value = "GLN Kodu";
        worksheet.Cell(1, 3).Value = "Şehir";

        // Populate the data
        int row = 2;
        foreach (var obj in list)
        {
            worksheet.Cell(row, 1).Value = obj.Title;
            worksheet.Cell(row, 2).Value = obj.Code;
            worksheet.Cell(row, 3).Value = obj.City;
            row++;
        }
        using var memoryStream = new MemoryStream();
        workbook.SaveAs(memoryStream);

        return Ok(memoryStream.ToArray());
    }
}
