using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class AddQuestionReq
{
    #region Properties
    public int OrderNumber { get; set; }

    public string Text { get; set; }

    public string DescriptiveAnswer { get; set; }

    public bool IsRequired { get; set; }

    public string AnswerType { get; set; }

    public AddQuestionReqSingleAnswer[] Answers { get; set; }
    #endregion

    #region Methods
    public Question ToDbModel(int SurveyId)
    {
        var answerType =
            AnswerType == "single" ? DataAccess.Entities.AnswerType.Single :
            AnswerType == "multiple" ?
            DataAccess.Entities.AnswerType.Multiple :
            throw new Exception("Unexpected AnswerType: " + AnswerType);
        return new Question
        {
            OrderNumber = OrderNumber,
            Text = Text,
            DescriptiveAnswer = DescriptiveAnswer,
            SurveyId = SurveyId,
            Required = IsRequired,
            AnswerType = answerType,
        };
    }
    #endregion
}

public class AddQuestionReqSingleAnswer
{
    #region Properties
    public string Text { get; set; }

    public string Label { get; set; }
    #endregion

    #region Methods
    public Answer ToDbModel(int questionId)
    {

        return new Answer
        {
            QuestionId = questionId,
            Label = Label,
            Text = Text,
        };
    }
    #endregion
}
