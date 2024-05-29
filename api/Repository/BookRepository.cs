using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Book;
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

        public async Task<List<Book>> GetAllAsync()
        {
            return await _context.Books.Include(c => c.BookComments).ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.Books.Include(c => c.BookComments).FirstOrDefaultAsync(i => i.Id == id);
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