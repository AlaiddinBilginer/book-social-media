using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.models;

namespace api.Interfaces
{
    public interface IAuthorCommentRepository
    {
        Task<List<AuthorComment>> GetAllAsync(AuthorCommentQueryObject queryObject);
        Task<AuthorComment?> GetByIdAsync(int id);
        Task<AuthorComment> CreateAsync(AuthorComment commentModel);
        Task<AuthorComment?> UpdateAsync(int id, AuthorComment commentModel);
        Task<AuthorComment?> DeleteAsync(int id);
    }
}