// Domain/Modals_DTO_/QuestionDtos.cs
using System;
using System.Collections.Generic;

namespace Domain.Modals_DTO_
{
    public class QuestionCreateDto
    {
        public string Title { get; set; } = null!;
        public string Body { get; set; } = null!;
        public string? Category { get; set; }
        public Guid StudentId { get; set; }
    }

    public class QuestionUpdateDto
    {
        public string? Title { get; set; }
        public string? Body { get; set; }
        public string? Category { get; set; }
        public int? Status { get; set; } // map to QuestionStatus (0/1/2)
    }

    public class AnswerCreateDto
    {
        public string Body { get; set; } = null!;
        public Guid AdminId { get; set; }
        public bool IsOfficial { get; set; } = true;
    }

    public class AnswerDto
    {
        public Guid Id { get; set; }
        public string Body { get; set; } = null!;
        public Guid AdminId { get; set; }
        public string? AdminName { get; set; }
        public bool IsOfficial { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class QuestionDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Body { get; set; } = null!;
        public string? Category { get; set; }

        public int Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public Guid StudentId { get; set; }
        public string? StudentName { get; set; }

        public List<AnswerDto> Answers { get; set; } = new();
    }
}
