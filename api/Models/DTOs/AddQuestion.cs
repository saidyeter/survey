using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class AddQuestion
{
    #region Properties
    public int OrderNumber { get; set; }

    public string Text { get; set; }

    public string DescriptiveAnswer { get; set; }

    public bool Active { get; set; }

    public int SurveyId { get; set; }

    public bool Required { get; set; }

    public string AnswerType { get; set; }

    public string A { get; set; }

    public string B { get; set; }

    public string C { get; set; }

    public string D { get; set; }

    public string E { get; set; }

    public string F { get; set; }

    public string G { get; set; }

    public string H { get; set; }

    public string I { get; set; }

    public string J { get; set; }

    public string K { get; set; }

    public string L { get; set; }

    public string M { get; set; }

    public string N { get; set; }

    public string O { get; set; }

    public string P { get; set; }

    public string Q { get; set; }

    public string R { get; set; }

    public string S { get; set; }

    public string T { get; set; }

    public string U { get; set; }

    public string V { get; set; }

    public string W { get; set; }

    public string X { get; set; }

    public string Y { get; set; }

    public string Z { get; set; }
    #endregion

    #region Methods
    public Question ToQuestion()
    {
        return new Question
        {
            OrderNumber = OrderNumber,
            Text = Text,
            DescriptiveAnswer = DescriptiveAnswer,
            Active = Active,
            SurveyId = SurveyId,
            Required = Required,
            AnswerType = AnswerType,
            A = A,
            B = B,
            C = C,
            D = D,
            E = E,
            F = F,
            G = G,
            H = H,
            I = I,
            J = J,
            K = K,
            L = L,
            M = M,
            N = N,
            O = O,
            P = P,
            Q = Q,
            R = R,
            S = S,
            T = T,
            U = U,
            V = V,
            W = W,
            X = X,
            Y = Y,
            Z = Z,
        };
    }
    #endregion
}
