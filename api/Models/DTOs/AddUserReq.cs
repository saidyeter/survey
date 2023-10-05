using SurveyApi.DataAccess.Entities;

namespace SurveyApi.Models.DTOs;

public class AddUserReq
{
    #region Properties
    public string DisplayName { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    #endregion

    #region Methods
    public User ToDbModel()
    {
        return new User { DisplayName = DisplayName, Email = Email, Password = Password, };
    }
    #endregion
}
