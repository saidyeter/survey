using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class SingleQuestion
{
    public Question Question { get; set; }
    public Answer[] Answers { get; set; }
}
