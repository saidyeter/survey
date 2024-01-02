using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class NewPartipiciantDto
{
    #region Properties
    public string Title { get; set; }

    public string Email { get; set; }

    public string PType { get; set; }

    public string Status { get; set; }

    public string Code { get; set; }

    public string City { get; set; }

    public string Subcity { get; set; }

    #endregion
    #region Methods
    public Participant Map()
    {
        return new Participant
        {
            City = City,
            Code = Code,
            PType = PType,
            Status = Status,
            Email = Email,
            Id = 0,
            Subcity = Subcity,
            Title = Title
        };
    }
    public Participant Map(Participant p)
    {
        p.City = City;
        p.Code = Code;
        p.PType = PType;
        p.Status = Status;
        p.Email = Email;
        p.Subcity = Subcity;
        p.Title = Title;

        return p;
    }
    #endregion
}