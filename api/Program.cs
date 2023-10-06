using Microsoft.EntityFrameworkCore;
using SurveyApi.DataAccess;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<SurveyDbContext>(options => options.UseSqlServer("name=ConnectionStrings:Default"));
//builder.Services.AddDbContext<SurveyDbContext>(options => options.UseSqlServer("Server=.;Database=Survey;Trusted_Connection=True;TrustServerCertificate=True;"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Use((context, next) =>
{
    var headers = context.Request.Headers;
    var authHeader = headers.Authorization;
    var key = authHeader.FirstOrDefault();
    if (authHeader.Count == 0 || string.IsNullOrEmpty(key))
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    }
    var config = context.RequestServices.GetService<IConfiguration>();

    var requiredkey = config.GetValue<string>("Security:ApiKey");

    if (!key.Equals(requiredkey))
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    }

    return next(context);
});

app.UseAuthorization();

app.MapControllers();

app.Run();
