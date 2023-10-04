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
    public async Task<IActionResult> AddQuestion(AddQuestion val)
    {
        // validation

        var data = val.ToQuestion();
         await dbContext.Questions.AddAsync(data);
        await dbContext.SaveChangesAsync();
        return Ok(data);
    }
}