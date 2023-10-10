using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class SingleAnswer
{
    #region Properties 
    public int QuestionId { get; set; }

    public string Answer { get; set; }

    public string AnswerDesc { get; set; }

    #endregion

    #region Methods 
    public ParticipantAnswer ToDbModel(int participationId, int partipiciantId)
    {
        return new ParticipantAnswer
        {
            Answer = Answer,
            ParticipationId = participationId,
            QuestionId = QuestionId,
            AnswerDesc = AnswerDesc,
            PartipiciantId = partipiciantId
        };
    }
    #endregion
}
