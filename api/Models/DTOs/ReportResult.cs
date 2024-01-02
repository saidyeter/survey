using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class ReportResult
{
    public Survey Survey { get; set; }
    public int SurveyId { get; set; }
    public int AllParticipantCount { get; set; }
    public int ParticipationCount { get; set; }
    public QuestionDetail[] QuestionDetails { get; set; }
}