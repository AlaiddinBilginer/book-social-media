using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.BookComment;
using api.Helpers;
using api.Interfaces;
using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BookCommentRepository : IBookCommentRepository
    {
        private readonly ApplicationDBContext _context;
        public BookCommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<BookComment>> GetAllAsync(BookCommentQueryObject queryObject)
        {
            var comments = _context.BookComments.AsQueryable();

            comments = comments.Where(c => c.Book.Id == queryObject.BookId);

            if(queryObject.IsDecsending == true)
            {
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }

            return await comments.Include(a => a.AppUser).ToListAsync();
        }

        public async Task<BookComment?> GetByIdAsync(int id)
        {
            return await _context.BookComments.Include(a => a.AppUser).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<BookComment> CreateAsync(BookComment commentModel)
        {
            await _context.BookComments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<BookComment?> UpdateAsync(int id, BookComment commentModel)
        {
            var existingComment = await _context.BookComments.FirstOrDefaultAsync(x => x.Id == id);

            if(existingComment == null) {
                return null;
            }

            existingComment.Content = commentModel.Content;

            await _context.SaveChangesAsync();

            return existingComment;

        }

        public async Task<BookComment?> DeleteAsync(int id)
        {
            var commentModel = await _context.BookComments.FirstOrDefaultAsync(x => x.Id == id);

            if(commentModel == null) {
                return null;
            }

            _context.Remove(commentModel);

            await _context.SaveChangesAsync();

            return commentModel;
        }
    }
}