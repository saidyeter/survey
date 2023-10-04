namespace SurveyApi.DataAccess.Entities;

public class ParticipantAnswer
{
    public int Id { get; set; }

    public int ParticipationId { get; set; }

    public int PartipiciantId { get; set; }

    public int QuestionId { get; set; }

    public string Answer { get; set; }

    public string AnswerDesc { get; set; }

}