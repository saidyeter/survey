USE [master]
GO
/****** Object:  Database [Survey]    Script Date: 04-Oct-23 2:57:43 PM ******/
CREATE DATABASE [Survey]
GO
ALTER DATABASE [Survey] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Survey].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Survey] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Survey] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Survey] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Survey] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Survey] SET ARITHABORT OFF 
GO
ALTER DATABASE [Survey] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Survey] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Survey] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Survey] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Survey] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Survey] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Survey] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Survey] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Survey] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Survey] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Survey] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Survey] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Survey] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Survey] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Survey] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Survey] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Survey] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Survey] SET RECOVERY FULL 
GO
ALTER DATABASE [Survey] SET  MULTI_USER 
GO
ALTER DATABASE [Survey] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Survey] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Survey] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Survey] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Survey] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Survey] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Survey', N'ON'
GO
ALTER DATABASE [Survey] SET QUERY_STORE = ON
GO
ALTER DATABASE [Survey] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Survey]
GO
/****** Object:  User [SurveyUser]    Script Date: 04-Oct-23 2:57:43 PM ******/
CREATE USER [SurveyUser] FOR LOGIN [SurveyUser] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [SurveyUser]
GO
/****** Object:  Table [dbo].[ParticipantAnswers]    Script Date: 04-Oct-23 2:57:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ParticipantAnswers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[ParticipationId] [int] NOT NULL,
	[PartipiciantId] [int] NOT NULL,
	[QuestionId] [int] NOT NULL,
	[Answer] [nchar](1) NOT NULL,
	[AnswerDesc] [nvarchar](2000) NULL,
 CONSTRAINT [PK_ParticipantAnswers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ParticipantAnswers]    Script Date: 04-Oct-23 2:57:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Email] [nvarchar](200) NOT NULL,
	[DisplayName] [nvarchar](200) NOT NULL,
	[Password] [nvarchar](200) NOT NULL,
	[Salt] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Participants]    Script Date: 04-Oct-23 2:57:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Participants](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Title] [nvarchar](200) NOT NULL,
	[Address] [nvarchar](2000) NULL,
	[LegalIdentifier] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Participants] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Participations]    Script Date: 04-Oct-23 2:57:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Participations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[PartipiciantId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[AdditionalWords] [nvarchar](2000) NULL,
 CONSTRAINT [PK_Participations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Questions]    Script Date: 04-Oct-23 2:57:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Questions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[OrderNumber] [int] NOT NULL,
	[Text] [nvarchar](2000) NOT NULL,
	[DescriptiveAnswer] [nchar](1) NULL,
	[Active] [bit] NOT NULL,
	[SurveyId] [int] NOT NULL,
	[Required] [bit] NOT NULL,
	[AnswerType] [nchar](10) NOT NULL,
	[A] [nvarchar](200) NOT NULL,
	[B] [nvarchar](200) NOT NULL,
	[C] [nvarchar](200) NULL,
	[D] [nvarchar](200) NULL,
	[E] [nvarchar](200) NULL,
	[F] [nvarchar](200) NULL,
	[G] [nvarchar](200) NULL,
	[H] [nvarchar](200) NULL,
	[I] [nvarchar](200) NULL,
	[J] [nvarchar](200) NULL,
	[K] [nvarchar](200) NULL,
	[L] [nvarchar](200) NULL,
	[M] [nvarchar](200) NULL,
	[N] [nvarchar](200) NULL,
	[O] [nvarchar](200) NULL,
	[P] [nvarchar](200) NULL,
	[Q] [nvarchar](200) NULL,
	[R] [nvarchar](200) NULL,
	[S] [nvarchar](200) NULL,
	[T] [nvarchar](200) NULL,
	[U] [nvarchar](200) NULL,
	[V] [nvarchar](200) NULL,
	[W] [nvarchar](200) NULL,
	[X] [nvarchar](200) NULL,
	[Y] [nvarchar](200) NULL,
	[Z] [nvarchar](200) NULL,
 CONSTRAINT [PK_Questions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Surveys]    Script Date: 04-Oct-23 2:57:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Surveys](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[Status] [int] NOT NULL,
	[Description] [nvarchar](2000) NULL,
 CONSTRAINT [PK_Surveys] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ParticipantAnswers] ADD  CONSTRAINT [DF_ParticipantAnswers_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[ParticipantAnswers] ADD  CONSTRAINT [DF_ParticipantAnswers_Answer]  DEFAULT ((0)) FOR [Answer]
GO
ALTER TABLE [dbo].[Participants] ADD  CONSTRAINT [DF_Participants_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Participations] ADD  CONSTRAINT [DF_Participations_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Questions] ADD  CONSTRAINT [DF_Questions_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Questions] ADD  CONSTRAINT [DF_Questions_Active]  DEFAULT ((1)) FOR [Active]
GO
ALTER TABLE [dbo].[Questions] ADD  CONSTRAINT [DF_Questions_Required]  DEFAULT ((1)) FOR [Required]
GO
ALTER TABLE [dbo].[Surveys] ADD  CONSTRAINT [DF_Surveys_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Surveys] ADD  CONSTRAINT [DF_Surveys_Status]  DEFAULT ((0)) FOR [Status]
GO
USE [master]
GO
ALTER DATABASE [Survey] SET  READ_WRITE 
GO
