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
    public class BookCommentRepository : IBookCommentRepository
    {
        private readonly ApplicationDBContext _context;
        public BookCommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<BookComment>> GetAllAsync()
        {
            return await _context.BookComments.ToListAsync();
        }

        public async Task<BookComment?> GetByIdAsync(int id)
        {
            return await _context.BookComments.FindAsync(id);
        }
    }
}