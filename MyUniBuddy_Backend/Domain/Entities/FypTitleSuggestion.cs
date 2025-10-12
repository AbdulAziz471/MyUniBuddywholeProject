using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class FypTitleSuggestion
    {
        public Guid Id { get; set; }

        // Core info
        public string Title { get; set; } = null!;
        public string? Domain { get; set; }                // e.g., “Sustainable & Green Process Engineering”
        public string? SubDomain { get; set; }             // optional
        public string? ProblemStatement { get; set; }
        public string? Description { get; set; }

        // Useful metadata
        public string? KeywordsCsv { get; set; }           // comma-separated keywords/tags
        public string? ToolsAndTech { get; set; }          // free text list
        public string? Difficulty { get; set; }            // e.g., Beginner/Intermediate/Advanced
        public string? ProposedBy { get; set; }            // supervisor or student name

        // Admin
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
