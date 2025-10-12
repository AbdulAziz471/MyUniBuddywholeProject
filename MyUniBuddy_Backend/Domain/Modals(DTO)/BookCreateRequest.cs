using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    public class BookCreateRequest
    {
        // Book fields
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string? ISBN { get; set; }
        public string? Category { get; set; }
        public string? SubCategory { get; set; }
        public int NumberOfCopies { get; set; }
        public string Location { get; set; } = null!;
        public string? Description { get; set; }

        // Files
        public IFormFile? ThumbnailImage { get; set; }
        public IFormFile? PdfFile { get; set; }
    }

    public class BookUpdateRequest : BookCreateRequest { }
}
