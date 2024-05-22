using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BookComment;
using api.models;

namespace api.Mappers
{
    public static class BookCommentMappers
    {
        public static BookCommentDto ToBookCommentDto(this BookComment bookCommentModel)
        {
            return new BookCommentDto
            {
                Id = bookCommentModel.Id,
                Content = bookCommentModel.Content,
                CreatedOn = bookCommentModel.CreatedOn,
                BookId = bookCommentModel.BookId
            };
        }
    }
}