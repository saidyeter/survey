namespace SurveyApi.Models.DTOs;

public class AnswerDetail
{
    public int Id { get; set; }
    public string Label { get; set; }
    public string Text { get; set; }
    public int ChoosenCount { get; set; }
}
