using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class AddQuestionReq
{
    #region Properties

    public string Text { get; set; }

    public string DescriptiveAnswer { get; set; }

    public bool IsRequired { get; set; }

    public string AnswerType { get; set; }

    public AddQuestionReqSingleAnswer[] Answers { get; set; }
    #endregion

    #region Methods
    public Question ToDbModel(int surveyId, int OrderNumber)
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
            SurveyId = surveyId,
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




public class UpdateOnRunningQuestionReq
{
    #region Properties
    public bool Required { get; set; }
    public string Text { get; set; }

    public UpdateOnRunningQuestionReqSingleAnswer[] Answers { get; set; }
    #endregion

}

public class UpdateOnRunningQuestionReqSingleAnswer
{
    #region Properties
    public int Id { get; set; }

    public string Text { get; set; }
    #endregion
}
