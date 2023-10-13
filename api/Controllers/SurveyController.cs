using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using SurveyApi.DataAccess;
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

    [OutputCache(Duration = 60 * 60)] // 1 saatligine cache yapar
    [HttpGet]
    public async Task<IActionResult> GetActiveSurvey()
    {
        var now = DateTime.Now;
        var val = await dbContext.Surveys
            .Where(u => u.StartDate < now && (u.EndDate > now || u.EndDate == null))
            .FirstOrDefaultAsync();
        if (val is null)
        {
            return NotFound();
        }
        return Ok(val);
    }
}
