using Microsoft.AspNetCore.Mvc;

namespace SurveyApi.Controllers;

[ApiController]
[Route("[controller]")]
public class SurveyController : ControllerBase
{
    private readonly ILogger<SurveyController> _logger;
    public SurveyController(ILogger<SurveyController> logger)
    {
        _logger = logger;
    }

}
