﻿namespace SurveyApi.DataAccess.Entities;

public class ParticipantAnswer
{
    public int Id { get; set; }

    public int ParticipationId { get; set; }

    public int QuestionId { get; set; }

    public int AnswerId { get; set; }
}