using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApi.DataAccess;
using SurveyApi.Models.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace SurveyApi.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> logger;
    private readonly SurveyDbContext dbContext;
    private readonly IConfiguration configuration;

    public UserController(ILogger<UserController> logger, SurveyDbContext dbContext, IConfiguration configuration)
    {
        this.logger = logger;
        this.dbContext = dbContext;
        this.configuration = configuration;
    }


    [HttpPost("check")]
    public async Task<IActionResult> GetUser(GetUserReq val)
    {
        var user = await dbContext.Users.Where(u => u.Email == val.Email).FirstOrDefaultAsync();
        if (user is null)
        {
            return BadRequest(new
            {
                Error = "Kullanici adi veya parola hatali"
            });
        }

        var hashedpassword = Hash(val.Password, user.Salt);
        if (!hashedpassword.Equals(user.Password))
        {
            return BadRequest(new
            {
                Error = "Kullanici adi veya parola hatali"
            });
        }

        return Ok(new
        {
            user.Id,
            user.DisplayName,
            user.Email,
        });

    }

    [HttpPost("new")]
    public async Task<IActionResult> AddUser(AddUserReq val)
    {
        var data = val.ToDbModel();
        var uniqueSalt = Guid.NewGuid().ToString().Replace("-", "").ToLower();
        ;
        var hashedpassword = Hash(data.Password, uniqueSalt);

        data.Password = hashedpassword;
        data.Salt = uniqueSalt;

        await dbContext.Users.AddAsync(data);
        await dbContext.SaveChangesAsync();
        logger.LogInformation("New user is created");
        return Ok(data);
    }

    private string Hash(string plainPassword, string uniqueSalt)
    {
        var appSalt = configuration.GetValue<string>("Security:PasswordSalt");

        if (string.IsNullOrEmpty(appSalt))
        {
            logger.LogError("Security:PasswordSalt config cannot found in appsettings");
            throw new Exception();
        }

        HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
        int keySize = 64;
        int iterations = 350000;

        var hash = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(plainPassword + appSalt),
            Encoding.UTF8.GetBytes(uniqueSalt),
            iterations,
            hashAlgorithm,
            keySize);
        return Convert.ToHexString(hash);
    }

}
