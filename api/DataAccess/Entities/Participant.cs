namespace SurveyApi.DataAccess.Entities;

public class Participant
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string Email { get; set; }

    public string PType { get; set; }
    
    public string Status { get; set; }
    
    public string Code { get; set; }

    public string City { get; set; }

    public string Subcity { get; set; }
}