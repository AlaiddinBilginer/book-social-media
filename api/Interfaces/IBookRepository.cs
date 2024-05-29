using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Book;
using api.models;

namespace api.Interfaces
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllAsync();
        Task<Book?> GetByIdAsync(int id);
        Task<Book> CreateAsync(Book bookModel);
        Task<Book?> UpdateAsync(int id, Book bookModel);
        Task<Book?> DeleteAsync(int id);
        Task<bool> BookExist(int id);
    }
}