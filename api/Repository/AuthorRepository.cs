using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AuthorRepository : IAuthorRepository
    {

        private readonly ApplicationDBContext _context;
        public AuthorRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Author>> GetAllAsync(AuthorsQueryObject query)
        {
            var authors = _context.Authors
                                    .Include(b => b.Books)
                                    .Include(c => c.AuthorComments)
                                    .ThenInclude(a => a.AppUser).AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.AuthorName))
            {
                authors = authors.Where(a => a.Name.Contains(query.AuthorName));
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await authors.Skip(skipNumber).Take(query.PageSize).ToListAsync(); 

        }

        public async Task<Author?> GetByIdAsync(int id)
        {
            return await _context.Authors
                                    .Include(b => b.Books)
                                    .Include(c => c.AuthorComments).ThenInclude(a => a.AppUser)
                                    .FirstOrDefaultAsync(i => i.Id == id);

        }

        public async Task<Author> CreateAsync(Author authorModel)
        {
            await _context.Authors.AddAsync(authorModel);
            await _context.SaveChangesAsync();
            return authorModel;
        }

        public async Task<Author?> UpdateAsync(int id, Author authorModel)
        {
            var existingAuthor = await _context.Authors.FirstOrDefaultAsync(i => i.Id == id);

            if(existingAuthor == null)
            {
                return null;
            }

            existingAuthor.Name = authorModel.Name;
            existingAuthor.Image = authorModel.Image;
            existingAuthor.Description = authorModel.Description;
            existingAuthor.Nationality = authorModel.Nationality;
            existingAuthor.BirthDate = authorModel.BirthDate;
            existingAuthor.DeathDate = authorModel.DeathDate;

            await _context.SaveChangesAsync();
            
            return existingAuthor;
        }

        public async Task<Author?> DeleteAsync(int id)
        {
            var existingAuthor = await _context.Authors.FirstOrDefaultAsync(i => i.Id == id);

            if(existingAuthor == null)
            {
                return null;
            }

            _context.Authors.Remove(existingAuthor);
            await _context.SaveChangesAsync();
            return existingAuthor;
        }

        public async Task<bool> AuthorExist(int id)
        {
            return await _context.Authors.AnyAsync(a => a.Id == id);
        }
    }
}