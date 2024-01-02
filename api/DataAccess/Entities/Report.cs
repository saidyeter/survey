namespace SurveyApi.DataAccess.Entities;

public class Report
{
    public int Id { get; set; }
    public int SurveyId { get; set; }
    public string CalculatedContent { get; set; }

}