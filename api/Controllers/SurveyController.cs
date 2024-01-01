using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApi.DataAccess;
using SurveyApi.DataAccess.Entities;
using SurveyApi.Models.DTOs;

namespace SurveyApi.Controllers;

[ApiController]
[Route("[controller]")]
public class SurveyController : ControllerBase
{
    private readonly ILogger<SurveyController> logger;
    private readonly SurveyDbContext dbContext;

    public SurveyController(ILogger<SurveyController> logger, SurveyDbContext dbContext)
    {
        this.logger = logger;
        this.dbContext = dbContext;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSurvey(int id)
    {
        var survey = await dbContext.Surveys
           .Where(x => x.Id == id)
           .FirstOrDefaultAsync();

        if (survey is null)
        {
            logger.LogInformation("No Surveys found ({id})", id);
            return NotFound();
        }

        var qnas = await dbContext.Questions
            .Where(x => x.SurveyId == survey.Id)
            .Select(l => new
            {
                question = l,
                answers = dbContext.Answers.Where(a => a.QuestionId == l.Id).ToList()
            }).ToListAsync();

        return Ok(new
        {
            survey,
            qnas
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateSurveyReq req)
    {
        var val = await dbContext.Surveys
           .Where(s => s.Status != SurveyStatus.Ended)
           .ToListAsync();

        if (val.Count == 1)
        {
            // zaten 1 bitmemis anket var
            return BadRequest();
        }

        if (val.Count > 1)
        {
            throw new Exception("There must be single active survey");
        }

        var newSurvey = new Survey
        {
            Name = req.Name,
            Description = req.Desc,
            StartDate = null,
            EndDate = null,
            Status = SurveyStatus.Pre
        };
        await dbContext.AddAsync(newSurvey);

        await dbContext.SaveChangesAsync();

        return Ok(newSurvey);
    }

    [HttpGet("check-new-survey-is-allowed")]
    public async Task<IActionResult> CheckNewSurveyIsAllowed()
    {
        var val = await dbContext.Surveys
            .Where(s => s.Status != SurveyStatus.Ended)
            .FirstOrDefaultAsync();

        return Ok(new
        {
            allowed = val is null
        });
    }

    [HttpGet("check-pre-survey-exists")]
    public async Task<IActionResult> CheckPreSurveyExists()
    {
        var val = await dbContext.Surveys
            .Where(s => s.Status == SurveyStatus.Pre)
            .FirstOrDefaultAsync();

        return Ok(new
        {
            exists = val is not null,
            id = val?.Id
        });
    }

    [HttpGet("active-survey")]
    public async Task<IActionResult> GetActiveSurvey()
    {
        var val = await dbContext.Surveys
            .Where(u => u.Status == SurveyStatus.Running)
            .ToListAsync();

        if (val is null || val.Count == 0)
        {
            return NotFound();
        }
        if (val.Count > 1)
        {
            throw new Exception("There must be single active survey");
        }

        return Ok(val.First());
    }

    [HttpGet("pre-survey")]
    public async Task<IActionResult> GetPreSurvey()
    {
        var val = await dbContext.Surveys
            .Where(u => u.Status == SurveyStatus.Pre)
            .ToListAsync();

        if (val is null || val.Count == 0)
        {
            return NotFound();
        }
        if (val.Count > 1)
        {
            throw new Exception("There must be single pre survey");
        }

        return Ok(val.First());
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetSurveys()
    {
        var val = await dbContext.Surveys
            .OrderByDescending(s => s.StartDate)
            .ToListAsync();
        if (val is null)
        {
            return NotFound();
        }
        return Ok(new
        {
            surveys = val
        });
    }

    [HttpGet("details")]
    public async Task<IActionResult> GetSurveyDetails([FromQuery] int surveyId)
    {
        var survey = await dbContext.Surveys
            .Where(s => s.Id == surveyId)
            .FirstOrDefaultAsync();
        if (survey is null)
        {
            return NotFound();
        }

        var allParticipantCount = await dbContext.Participants.CountAsync();
        var partipicions = await dbContext.Participations
            .Where(p => p.SurveyId == surveyId)
            .ToListAsync();
        var partipicionIdList = partipicions.Select(p => p.Id).ToList();

        var questions = await dbContext.Questions
            .Where(q => q.SurveyId == surveyId)
            .ToListAsync();
        var questionIdList = questions.Select(p => p.Id).ToList();

        var answers = await dbContext.Answers
            .Where(a => questionIdList.Contains(a.QuestionId))
            .ToListAsync();

        var participantAnswers = dbContext.ParticipantAnswers.Where(pa => partipicionIdList.Contains(pa.ParticipationId)).ToList();

        var report = participantAnswers
            .GroupBy(gp => gp.QuestionId)
            .Select(pa => new QuestionDetail
            {
                Question = questions.FirstOrDefault(q => q.Id == pa.Key),
                AnsweredCount = pa.Count(),
                AnswerDetails = pa
                    .GroupBy(gba => gba.AnswerId)
                    .Select(a =>
                    {
                        var _answer = answers.FirstOrDefault(x => x.Id == a.Key);
                        return new AnswerDetail
                        {
                            ChoosenCount = a.Count(),
                            Label = _answer?.Label,
                            Text = _answer?.Text,
                            Id = _answer?.Id ?? -1
                        };
                    })
                    .OrderBy(a => a.Label)
                    .ToArray()

            }).ToArray();

        return Ok(new
        {
            Survey = survey,
            SurveyId = surveyId,
            AllParticipantCount = allParticipantCount,
            ParticipationCount = partipicions.Count,
            QuestionDetails = report
        });
    }

    [HttpGet("temp")]
    public async Task<IActionResult> Seed()
    {

        /*
        truncate table [Answers];
        truncate table [ParticipantAnswers];
        truncate table [Participants];
        truncate table [Participations];
        truncate table [Questions];
        truncate table [Surveys];
        truncate table [Users];

        select 
        (select count(1) from [Answers]) as AnswerCount,
        (select count(1) from [ParticipantAnswers]) as ParticipantAnswerCount,
        (select count(1) from [Participants]) as ParticipantCount,
        (select count(1) from [Participations]) as ParticipationCount,
        (select count(1) from [Questions]) as QuestionCount,
        (select count(1) from [Surveys]) as SurveyCount,
        (select count(1) from [Users]) as UserCount;

         */

        var random = new Random();
        var faker = new Faker();

        var participants = new List<Participant>();

        foreach (var u in faker.GetFakeUser())
        {
            participants.Add(new Participant
            {
                Email = u.Email,
                Title = u.Title,
                City = u.City,
                Subcity = u.Subcity,
                Code = u.Code,
                PType = "Eczane",
                Status = "Aktif"
            });
        }
        dbContext.AddRange(participants);

        var surveys = new List<Survey>();

        var months = new[] { "", "OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ", "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK", };
        var now = DateTime.Now;
        var surveyDate = new DateTime(now.Year, now.Month, 1);
        for (int i = 0; i < 5; i++)
        {
            surveyDate = surveyDate.AddMonths(-1 * random.Next(2, i + 5));
            var startdate = surveyDate.AddMonths(-1);
            surveys.Add(new Survey
            {
                StartDate = startdate,
                EndDate = startdate.AddMonths(1).AddDays(-1),
                Name = $"{i + 1}. Anket",
                Description = i % 2 == 0 ? "" : $"{i + 1}. Anketin aciklamasi",
                Status = SurveyStatus.Ended
            });
        }
        dbContext.Surveys.AddRange(surveys);
        await dbContext.SaveChangesAsync();


        var answerLabels = "ABCDEFGHIJKLMNOPRSTUVYZ";

        foreach (var s in surveys)
        {
            var qCounter = 1;
            foreach (var fq in faker.GetFakeQuestions())
            {
                var q = new Question()
                {
                    OrderNumber = qCounter++,
                    Text = fq.Text,
                    SurveyId = s.Id,
                    Required = random.Next(1, 10) % 4 != 0,
                    AnswerType = AnswerType.Single,
                };
                dbContext.Add(q);

                await dbContext.SaveChangesAsync();

                var aCounter = 0;
                foreach (var an in fq.Answers)
                {
                    dbContext.Add(new Answer
                    {
                        Label = answerLabels[aCounter++].ToString(),
                        QuestionId = q.Id,
                        Text = an
                    });
                }
                await dbContext.SaveChangesAsync();
            }
        }

        foreach (var s in surveys)
        {
            var pCount = participants.Count;
            var length = pCount
                - s.StartDate?.Month * 2
                - (s.StartDate?.Month % 3 == 0 ? 5 : 0)
                - (s.StartDate?.Month % 5 == 0 ? 3 : 0)
                - (s.StartDate?.Month % 7 == 0 ? 1 : 0);

            var picked = new HashSet<int>();
            for (var i = 0; i < length; i++)
            {
                var pId = random.Next(pCount - 1);
                while (picked.Any(p => p == pId))
                {
                    pId = random.Next(pCount - 1);
                }
                picked.Add(pId);
                var d = pId % 2 == 0 ? 3 : 5;
                dbContext.Add(new Participation
                {
                    StartDate = s.StartDate.Value.Date.AddDays(d),
                    EndDate = s.EndDate.Value.Date.AddDays(-1 * d),
                    PartipiciantId = pId,
                    SurveyId = s.Id,
                    ParticipationTicket = Guid.NewGuid().ToString().Replace("-", "").ToLower(),
                    AdditionalWords = string.Empty
                });
            }
        }

        await dbContext.SaveChangesAsync();

        var allQuestions = dbContext.Questions.ToList();
        var allAnswers = dbContext.Answers.ToList();

        foreach (var participation in dbContext.Participations.ToList())
        {
            var qs = allQuestions
                .Where(q => q.SurveyId == participation.SurveyId)
                .ToList();

            var questionIdList = qs.Select(p => p.Id).ToList();
            var answers = allAnswers
                .Where(a => questionIdList.Contains(a.QuestionId))
                .ToList();


            var counter = 0;
            foreach (var q in qs)
            {
                if (!q.Required && random.Next(1, 10) % 3 == 0)
                {
                    continue;
                }
                var currentAnswers = answers.Where(a => a.QuestionId == q.Id).ToList();

                var answer = currentAnswers[random.Next(0, currentAnswers.Count)];

                dbContext.ParticipantAnswers.Add(new ParticipantAnswer
                {
                    QuestionId = q.Id,
                    AnswerId = answer.Id,
                    ParticipationId = participation.Id,
                });
                counter++;
            }

            if (counter > 500)
            {
                await dbContext.SaveChangesAsync();
                counter = 0;
            }
        }


        dbContext.Users.Add(new User
        {
            DisplayName = "admin",
            Email = "s@yeter.com",
            Password = "8B45F97536AEFCE77C9243D387FA587C55C624765F466CA3CFE2AD22F28AB3EA21D3E224DAA91CE6EEEA60FB02D2635CA710CFCF3B8BCB1B3625F1086FEB4A21",
            Salt = "95f5dc4d094b4c459990fbcf4f01c07e"
        });
        await dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("start-survey")]
    public async Task<IActionResult> Start()
    {
        var val = await dbContext.Surveys
            .Where(s => s.Status != SurveyStatus.Ended)
            .ToListAsync();

        if (val.Count == 0)
        {
            // baslatacak anket yok
            return BadRequest();
        }

        if (val.Count > 1)
        {
            throw new Exception("There must be single survey");
        }

        var activeSurvey = val.First();

        if (activeSurvey.Status == SurveyStatus.Running)
        {
            // anket zaten baslatilmis
            return BadRequest();
        }

        if (dbContext.Questions.Count(x => x.SurveyId == activeSurvey.Id) < 1)
        {
            // hic soru yok
            return BadRequest();

        }

        activeSurvey.Status = SurveyStatus.Running;
        activeSurvey.StartDate = DateTime.Now;

        dbContext.Update(activeSurvey);

        await dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("finish-survey")]
    public async Task<IActionResult> Finish()
    {
        var val = await dbContext.Surveys
            .Where(s => s.Status != SurveyStatus.Ended)
            .ToListAsync();

        if (val.Count == 0)
        {
            // baslatacak anket yok
            return BadRequest();
        }

        if (val.Count > 1)
        {
            throw new Exception("There must be single survey");
        }

        var activeSurvey = val.First();

        if (activeSurvey.Status == SurveyStatus.Pre)
        {
            // anket henuz baslatilmamis
            return BadRequest();
        }

        activeSurvey.Status = SurveyStatus.Ended;
        activeSurvey.EndDate = DateTime.Now;

        dbContext.Update(activeSurvey);

        await dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("remove-pre-survey")]
    public async Task<IActionResult> RemovePreSurvey()
    {
        var surveys = await dbContext.Surveys
            .Where(s => s.Status == SurveyStatus.Pre)
            .ToListAsync();

        if (surveys.Count == 0)
        {
            logger.LogInformation("No pre survey found");
            return BadRequest();
        }

        if (surveys.Count > 1)
        {
            throw new Exception("There must be single pre survey");
        }

        var survey = surveys.First();
        var questions = await dbContext
            .Questions
            .Where(x => x.SurveyId == survey.Id)
            .ToListAsync();
        var questionIdList = questions
            .Select(q => q.Id)
            .ToList();
        var answers = await dbContext
            .Answers
            .Where(a => questionIdList.Contains(a.QuestionId))
            .ToListAsync();

        dbContext.Remove(survey);
        dbContext.RemoveRange(questions);
        dbContext.RemoveRange(answers);
        await dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("update-survey-info/{id}")]
    public async Task<IActionResult> UpdateSurveyInfo(int id, CreateSurveyReq req)
    {
        var surveys = await dbContext.Surveys
            .Where(s => s.Id == id)
            .ToListAsync();

        if (surveys.Count == 0)
        {
            logger.LogInformation("No survey found by {id} id", id);
            return BadRequest();
        }

        if (surveys.Count > 1)
        {
            throw new Exception("There must be single survey");
        }

        var survey = surveys.First();
        if (survey.Status == SurveyStatus.Ended)
        {
            logger.LogInformation("The survey is ended {id} id. And cant be any change ", id);
            return BadRequest();
        }

        survey.Name = req.Name;
        survey.Description = req.Desc;

        dbContext.Update(survey);

        await dbContext.SaveChangesAsync();

        return Ok();
    }
}

