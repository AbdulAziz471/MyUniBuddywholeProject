namespace Domain.Modals_DTO_
{
    public class BookDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string? ISBN { get; set; }
        public string? Category { get; set; }
        public string? SubCategory { get; set; }
        public int NumberOfCopies { get; set; }
        public string Location { get; set; } = null!;
        public string? Description { get; set; }

        public string? ThumbnailImageUrl { get; set; }
        public string? PdfUrl { get; set; }
    }
}
