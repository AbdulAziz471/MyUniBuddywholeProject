using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class EmailTemplate
    {
        public Guid Id { get; set; } 
        public string Name { get; set; }
        public string SubjectTemplate { get; set; } 
        public string BodyTemplate { get; set; } 
        public bool IsHtml { get; set; } = true;
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedOn { get; set; }
    }
}
