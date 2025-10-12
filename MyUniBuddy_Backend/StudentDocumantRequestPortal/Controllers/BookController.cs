using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IBook _bookService;
        private readonly IWebHostEnvironment _env;

        public BookController(IBook bookService, IWebHostEnvironment env)
        {
            _bookService = bookService;
            _env = env;
        }

        // ---------- JSON endpoints (keep) ----------
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await _bookService.GetAllAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var book = await _bookService.GetByIdAsync(id);
            if (book == null) return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BookDto dto)
        {
            var id = await _bookService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] BookDto dto)
        {
            var updated = await _bookService.UpdateAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _bookService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        // ---------- New: file-upload endpoints ----------
        // POST /api/Book/with-files
        [HttpPost("with-files")]
        [RequestSizeLimit(100_000_000)] // ~100 MB
        public async Task<IActionResult> CreateWithFiles([FromForm] BookCreateRequest req)
        {
            var (thumbUrl, pdfUrl) = await SaveFilesAsync(req.ThumbnailImage, req.PdfFile);

            var dto = new BookDto
            {
                Title = req.Title,
                Author = req.Author,
                ISBN = req.ISBN,
                Category = req.Category,
                SubCategory = req.SubCategory,
                NumberOfCopies = req.NumberOfCopies,
                Location = req.Location,
                Description = req.Description,
                ThumbnailImageUrl = thumbUrl,
                PdfUrl = pdfUrl
            };

            var id = await _bookService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        // PUT /api/Book/{id}/with-files
        [HttpPut("{id}/with-files")]
        [RequestSizeLimit(100_000_000)]
        public async Task<IActionResult> UpdateWithFiles(Guid id, [FromForm] BookUpdateRequest req)
        {
            var existing = await _bookService.GetByIdAsync(id);
            if (existing is null) return NotFound();

            var (thumbUrl, pdfUrl) = await SaveFilesAsync(req.ThumbnailImage, req.PdfFile);

            var dto = new BookDto
            {
                Id = id,
                Title = req.Title,
                Author = req.Author,
                ISBN = req.ISBN,
                Category = req.Category,
                SubCategory = req.SubCategory,
                NumberOfCopies = req.NumberOfCopies,
                Location = req.Location,
                Description = req.Description,
                ThumbnailImageUrl = thumbUrl ?? existing.ThumbnailImageUrl,
                PdfUrl = pdfUrl ?? existing.PdfUrl
            };

            var updated = await _bookService.UpdateAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        // ---------- Helpers ----------
        private async Task<(string? thumbUrl, string? pdfUrl)> SaveFilesAsync(IFormFile? thumbnail, IFormFile? pdf)
        {
            string webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var baseDir = Path.Combine(webRoot, "uploads", "books");
            var thumbsDir = Path.Combine(baseDir, "thumbnails");
            var pdfsDir = Path.Combine(baseDir, "pdfs");

            Directory.CreateDirectory(thumbsDir);
            Directory.CreateDirectory(pdfsDir);

            string? thumbUrl = null, pdfUrl = null;

            if (thumbnail is not null && thumbnail.Length > 0)
            {
                var allowedImageTypes = new[] { "image/jpeg", "image/png", "image/webp", "image/gif" };
                if (!allowedImageTypes.Contains(thumbnail.ContentType))
                    throw new BadHttpRequestException("ThumbnailImage must be jpeg/png/webp/gif.");

                var name = $"{Guid.NewGuid()}{Path.GetExtension(thumbnail.FileName)}";
                var path = Path.Combine(thumbsDir, name);
                using var s = System.IO.File.Create(path);
                await thumbnail.CopyToAsync(s);
                thumbUrl = $"/uploads/books/thumbnails/{name}";
            }

            if (pdf is not null && pdf.Length > 0)
            {
                if (pdf.ContentType != "application/pdf" &&
                    !pdf.FileName.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase))
                    throw new BadHttpRequestException("PdfFile must be a PDF.");

                var name = $"{Guid.NewGuid()}{Path.GetExtension(pdf.FileName)}";
                var path = Path.Combine(pdfsDir, name);
                using var s = System.IO.File.Create(path);
                await pdf.CopyToAsync(s);
                pdfUrl = $"/uploads/books/pdfs/{name}";
            }

            return (thumbUrl, pdfUrl);
        }
    }
}
