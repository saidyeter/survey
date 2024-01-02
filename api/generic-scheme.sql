CREATE DATABASE [Survey]
CREATE TABLE [Survey].[dbo].[Answers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Text] [nvarchar](200) NOT NULL,
	[Label] [nvarchar](1) NOT NULL,
	[QuestionId] [int] NOT NULL
 CONSTRAINT [PK_Answers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))

CREATE TABLE [Survey].[dbo].[ParticipantAnswers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[ParticipationId] [int] NOT NULL,
	[QuestionId] [int] NOT NULL,
	[AnswerId] [int] NOT NULL,
 CONSTRAINT [PK_ParticipantAnswers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))

CREATE TABLE [Survey].[dbo].[Participants](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[PType] [nvarchar](50) NULL,
	[Code] [nvarchar](50) NOT NULL,
	[Title] [nvarchar](200) NOT NULL,
	[Email] [nvarchar](200) NOT NULL,
	[Status] [nvarchar](50) NULL,
	[City] [nvarchar](50) NULL,
	[Subcity] [nvarchar](50) NULL,
 CONSTRAINT [PK_Participants] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
CREATE TABLE [Survey].[dbo].[Participations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[PartipiciantId] [int] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[AdditionalWords] [nvarchar](2000) NULL,
	[ParticipationTicket] [nvarchar](50) NOT NULL,
	[SurveyId] [int] NOT NULL,
 CONSTRAINT [PK_Participations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))

CREATE TABLE [Survey].[dbo].[Questions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[OrderNumber] [int] NOT NULL,
	[Text] [nvarchar](2000) NOT NULL,
	[DescriptiveAnswer] [nvarchar](1) NULL,
	[SurveyId] [int] NOT NULL,
	[Required] [bit] NOT NULL,
	[AnswerType] [int] NOT NULL,
 CONSTRAINT [PK_Questions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))

CREATE TABLE [Survey].[dbo].[Surveys](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[Status] [int] NOT NULL,
	[Description] [nvarchar](2000) NULL,
 CONSTRAINT [PK_Surveys] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
CREATE TABLE [Survey].[dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[DisplayName] [nvarchar](200) NOT NULL,
	[Email] [nvarchar](200) NOT NULL,
	[Password] [nvarchar](200) NOT NULL,
	[Salt] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))

CREATE TABLE [dbo].[Reports](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SurveyId] [int] NOT NULL,
	[CalculatedContent] [text] NOT NULL,
 CONSTRAINT [PK_Report] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))

ALTER TABLE [Survey].[dbo].[Answers] ADD  CONSTRAINT [DF_Answers_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]


ALTER TABLE [Survey].[dbo].[ParticipantAnswers] ADD  CONSTRAINT [DF_ParticipantAnswers_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
ALTER TABLE [Survey].[dbo].[ParticipantAnswers] ADD  CONSTRAINT [DF_ParticipantAnswers_Answer]  DEFAULT ((0)) FOR [AnswerId]
ALTER TABLE [Survey].[dbo].[Participants] ADD  CONSTRAINT [DF_Participants_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
ALTER TABLE [Survey].[dbo].[Participations] ADD  CONSTRAINT [DF_Participations_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
ALTER TABLE [Survey].[dbo].[Questions] ADD  CONSTRAINT [DF_Questions_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
ALTER TABLE [Survey].[dbo].[Questions] ADD  CONSTRAINT [DF_Questions_Required]  DEFAULT ((1)) FOR [Required]
ALTER TABLE [Survey].[dbo].[Surveys] ADD  CONSTRAINT [DF_Surveys_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
ALTER TABLE [Survey].[dbo].[Surveys] ADD  CONSTRAINT [DF_Surveys_Status]  DEFAULT ((0)) FOR [Status]
ALTER TABLE [Survey].[dbo].[Users] ADD  CONSTRAINT [DF_Users_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]











