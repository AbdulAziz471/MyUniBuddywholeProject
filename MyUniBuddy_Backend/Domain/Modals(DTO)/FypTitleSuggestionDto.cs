using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    public class FypTitleSuggestionDto
    {
        public Guid? Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Domain { get; set; }
        public string? SubDomain { get; set; }
        public string? ProblemStatement { get; set; }
        public string? Description { get; set; }
        public string? KeywordsCsv { get; set; }
        public string? ToolsAndTech { get; set; }
        public string? Difficulty { get; set; }
        public string? ProposedBy { get; set; }
    }
}
