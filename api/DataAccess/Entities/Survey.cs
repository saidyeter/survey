namespace SurveyApi.DataAccess.Entities;

public class Survey
{
    public int Id { get; set; }

    public string Name { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public SurveyStatus Status { get; set; }

    public string Description { get; set; }
}

public enum SurveyStatus
{
    Pre,
    Running,
    Ended
}
