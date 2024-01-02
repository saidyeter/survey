using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class QuestionDetail
{
    public Question Question { get; set; }
    public List<AnswerDetail> AnswerDetails { get; set; }
    public int AnsweredCount { get; set; }
}
