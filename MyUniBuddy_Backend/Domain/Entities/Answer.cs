// Domain/Entities/Answer.cs
using System;

namespace Domain.Entities
{
    public class Answer
    {
        public Guid Id { get; set; }

        public Guid QuestionId { get; set; }
        public Question Question { get; set; } = null!;

        public string Body { get; set; } = null!;

        // Who answered (Admin)
        public Guid AdminId { get; set; }
        public AspNetUser Admin { get; set; } = null!;

        public bool IsOfficial { get; set; } = true; // mark as official admin response
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
