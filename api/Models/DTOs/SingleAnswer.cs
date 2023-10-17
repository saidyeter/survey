using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class SingleAnswer
{
    #region Properties 
    public int QuestionId { get; set; }

    public int AnswerId { get; set; }

    public string AnswerDesc { get; set; }

    #endregion

    #region Methods 
    public ParticipantAnswer ToParticipantAnswer(int participationId)
    {
        return new ParticipantAnswer
        {
            AnswerId = AnswerId,
            ParticipationId = participationId,
            QuestionId = QuestionId
        };
    }
    #endregion
}
