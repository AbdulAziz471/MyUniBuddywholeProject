// Domain/Entities/Question.cs
using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public enum QuestionStatus
    {
        Open = 0,
        Answered = 1,
        Closed = 2
    }

    public class Question
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Body { get; set; } = null!;
        public string? Category { get; set; }

        // Who asked
        public Guid StudentId { get; set; }
        public AspNetUser Student { get; set; } = null!;

        public QuestionStatus Status { get; set; } = QuestionStatus.Open;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public ICollection<Answer> Answers { get; set; } = new List<Answer>();
    }
}
