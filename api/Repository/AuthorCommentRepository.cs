using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AuthorCommentRepository : IAuthorCommentRepository
    {
        private readonly ApplicationDBContext _context;
        public AuthorCommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<AuthorComment>> GetAllAsync()
        {
            return await _context.AuthorComments.ToListAsync();
        }

        public async Task<AuthorComment?> GetByIdAsync(int id)
        {
            return await _context.AuthorComments.FindAsync(id);
        }

        public async Task<AuthorComment> CreateAsync(AuthorComment commentModel)
        {
            await _context.AuthorComments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<AuthorComment?> UpdateAsync(int id, AuthorComment commentModel)
        {
            var existingComment = await _context.AuthorComments.FirstOrDefaultAsync(c => c.Id == id);

            if(existingComment == null)
            {
                return null;
            }

            existingComment.Content = commentModel.Content;

            await _context.SaveChangesAsync();

            return existingComment;
        }

        public async Task<AuthorComment?> DeleteAsync(int id)
        {
            var existingComment = await _context.AuthorComments.FirstOrDefaultAsync(c => c.Id == id);

            if(existingComment == null)
            {
                return null;
            }

            _context.Remove(existingComment);

            await _context.SaveChangesAsync();

            return existingComment;
        }
    }
}