using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class AddQuestionReq
{
    #region Properties
    public int OrderNumber { get; set; }

    public string Text { get; set; }

    //public string DescriptiveAnswer { get; set; }

    public int SurveyId { get; set; }

    public bool Required { get; set; }

    public int AnswerType { get; set; }
    #endregion

    #region Methods
    public Question ToDbModel()
    {
        return new Question
        {
            OrderNumber = OrderNumber,
            Text = Text,
            DescriptiveAnswer = -1,
            SurveyId = SurveyId,
            Required = Required,
            AnswerType = (AnswerType)AnswerType,
        };
    }
    #endregion
}

public class GetQuestionsRes
{
    public SigleQuestion[] Survey { get; set; }
}

public class SigleQuestion
{
    public Question Question { get; set; }
    public Answer[] Answers { get; set; }
}