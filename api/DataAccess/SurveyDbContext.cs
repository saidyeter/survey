using Microsoft.EntityFrameworkCore;
using SurveyApi.DataAccess.Entities;

namespace SurveyApi.DataAccess;

public class SurveyDbContext : DbContext
{
    public SurveyDbContext(DbContextOptions<SurveyDbContext> options) :
        base(options)
    { }

    public DbSet<Question> Questions{ get; set; }
    public DbSet<Survey> Surveys { get; set; }
    public DbSet<Participant> Participants { get; set; }
    public DbSet<ParticipantAnswer> ParticipantAnswers { get; set; }
    public DbSet<Participation> Participations { get; set; }
    public DbSet<User> Users { get; set; }

}
