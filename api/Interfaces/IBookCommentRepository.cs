using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BookComment;
using api.Helpers;
using api.models;

namespace api.Interfaces
{
    public interface IBookCommentRepository
    {
        Task<List<BookComment>> GetAllAsync(BookCommentQueryObject queryObject);
        Task<BookComment?> GetByIdAsync(int id);
        Task<BookComment> CreateAsync(BookComment commentModel);
        Task<BookComment?> UpdateAsync(int id, BookComment commentModel);
        Task<BookComment?> DeleteAsync(int id);
    }
}