using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Book;
using api.models;

namespace api.Mappers
{
    public static class BookMappers
    {
        public static BookDto ToBookDto(this Book bookModel)
        {
            return new BookDto
            {
                Id = bookModel.Id,
                Name = bookModel.Name,
                Description = bookModel.Description,
                Page = bookModel.Page,
                PublicationDate = bookModel.PublicationDate,
                Image = bookModel.Image,
                AuthorId = bookModel.AuthorId
            };
        }
    }
}