using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Book;
using api.Helpers;
using api.Interfaces;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly ApplicationDBContext _context;
        public BookRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Book>> GetAllAsync(BooksQueryObject query)
        {
            var books = _context.Books
                                .Include(c => c.BookComments).ThenInclude(a => a.AppUser)
                                .Include(b => b.BookCategories).ThenInclude(c => c.Category)
                                .AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.BookName)) 
            {
                books = books.Where(b => b.Name.Contains(query.BookName));
            }

            if (query.CategoryId.HasValue)
            {
                books = books.Where(b => b.BookCategories.Any(bc => bc.CategoryId == query.CategoryId));
            }

            if(!string.IsNullOrWhiteSpace(query.SortBy)) 
            {
                if(query.SortBy.Equals("Page", StringComparison.OrdinalIgnoreCase))
                {
                    books = query.IsDescending ? 
                        books.OrderByDescending(b => b.Page) :
                        books.OrderBy(b => b.Page);
                }

                if(query.SortBy.Equals("PublicationDate", StringComparison.OrdinalIgnoreCase))
                {
                    books = query.IsDescending ? 
                        books.OrderByDescending(b => b.PublicationDate) :
                        books.OrderBy(b => b.PublicationDate);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await books.OrderBy(b => b.Id).Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.Books
                        .Include(c => c.BookComments).ThenInclude(a => a.AppUser)
                        .Include(b => b.BookCategories).ThenInclude(c => c.Category)
                        .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Book> CreateAsync(Book bookModel)
        {
            await _context.Books.AddAsync(bookModel);
            await _context.SaveChangesAsync();
            return bookModel;
        }

        public async Task<Book?> UpdateAsync(int id, Book bookModel)
        {
            var existingBook = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);

            if (existingBook == null)
            {
                return null;
            }

            existingBook.Name = bookModel.Name;
            existingBook.Description = bookModel.Description;
            existingBook.Page = bookModel.Page;
            existingBook.PublicationDate = bookModel.PublicationDate;
            existingBook.Image = bookModel.Image;
            existingBook.AuthorId = bookModel.AuthorId;

            await _context.SaveChangesAsync();

            return existingBook;
        }

        public async Task<Book?> DeleteAsync(int id)
        {
            var bookModel = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);

            if (bookModel == null)
            {
                return null;
            }

            _context.Books.Remove(bookModel);

            await _context.SaveChangesAsync();

            return bookModel;
        }

        public async Task<bool> BookExist(int id)
        {
            return await _context.Books.AnyAsync(s => s.Id == id);
        }
    }
}
