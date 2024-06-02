using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.models;

namespace api.Interfaces
{
    public interface IAuthorRepository
    {
        Task<List<Author>> GetAllAsync(QueryObject query);
        Task<Author?> GetByIdAsync(int id);
        Task<Author> CreateAsync(Author authorModel);
        Task<Author?> UpdateAsync(int id, Author authorModel);
        Task<Author?> DeleteAsync(int id);
    }
}