namespace SurveyApi.DataAccess.Entities;

public class Participation
{
    public int Id { get; set; }

    public int PartipiciantId { get; set; }

    public int SurveyId { get; set; }
    
    public string ParticipationTicket { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string AdditionalWords { get; set; }

}