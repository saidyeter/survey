namespace SurveyApi.DataAccess.Entities;

public class Question
{
    public int Id { get; set; }

    public int OrderNumber { get; set; }

    public string Text { get; set; }

    public int? DescriptiveAnswer { get; set; }

    public int SurveyId { get; set; }

    public bool Required { get; set; }

    public AnswerType AnswerType { get; set; }

}

public enum AnswerType
{
    Single,
    Multiple,
    YesNo
}