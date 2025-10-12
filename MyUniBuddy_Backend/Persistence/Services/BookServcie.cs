using Domain.Entities;
using Domain.Modals_DTO_;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class BookService : IBook
    {
        private readonly DbStudentRequestContext _context;

        public BookService(DbStudentRequestContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BookDto>> GetAllAsync()
        {
            return await _context.Books
                .Select(p => new BookDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Author = p.Author,
                    ISBN = p.ISBN,
                    Category = p.Category,
                    SubCategory = p.SubCategory,
                    NumberOfCopies = p.NumberOfCopies,
                    Description = p.Description,
                    Location = p.Location,
                    ThumbnailImageUrl = p.ThumbnailImageUrl,
                    PdfUrl = p.PdfUrl
                }).ToListAsync();
        }

        public async Task<BookDto?> GetByIdAsync(Guid id)
        {
            return await _context.Books
                .Where(p => p.Id == id)
                .Select(p => new BookDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Author = p.Author,
                    ISBN = p.ISBN,
                    Category = p.Category,
                    SubCategory = p.SubCategory,
                    NumberOfCopies = p.NumberOfCopies,
                    Description = p.Description,
                    Location = p.Location,
                    ThumbnailImageUrl = p.ThumbnailImageUrl,
                    PdfUrl = p.PdfUrl
                }).FirstOrDefaultAsync();
        }

        public async Task<Guid> CreateAsync(BookDto dto)
        {
            var book = new Book
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Author = dto.Author,
                ISBN = dto.ISBN,
                Category = dto.Category,
                SubCategory = dto.SubCategory,
                NumberOfCopies = dto.NumberOfCopies,
                Description = dto.Description,
                Location = dto.Location,
                ThumbnailImageUrl = dto.ThumbnailImageUrl,
                PdfUrl = dto.PdfUrl
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return book.Id;
        }

        public async Task<bool> UpdateAsync(Guid id, BookDto dto)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;

            book.Title = dto.Title;
            book.Author = dto.Author;
            book.ISBN = dto.ISBN;
            book.Category = dto.Category;
            book.SubCategory = dto.SubCategory;
            book.NumberOfCopies = dto.NumberOfCopies;
            book.Description = dto.Description;
            book.Location = dto.Location;
            book.ThumbnailImageUrl = dto.ThumbnailImageUrl;
            book.PdfUrl = dto.PdfUrl;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
