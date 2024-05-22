using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;

namespace api.Interfaces
{
    public interface IBookCommentRepository
    {
        Task<List<BookComment>> GetAllAsync();
        Task<BookComment?> GetByIdAsync(int id);
        Task<BookComment> CreateAsync(BookComment commentModel);
    }
}