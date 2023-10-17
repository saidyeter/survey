namespace SurveyApi.DataAccess.Entities;

public class Answer
{
    public int Id { get; set; }

    public string Text { get; set; }

    public string Label { get; set; }

    public int QuestionId { get; set; }

}