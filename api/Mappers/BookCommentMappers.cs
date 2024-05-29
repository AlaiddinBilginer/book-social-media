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

        public static BookComment ToBookCommentFromCreateDto(this CreateBookCommentDto commentDto, int bookId)
        {
            return new BookComment
            {
                Content = commentDto.Content,
                BookId = bookId
            };
        }

        public static BookComment ToBookCommentFromUpdateDto(this UpdateBookCommentDto commentDto)
        {
            return new BookComment
            {
                Content = commentDto.Content,
            };
        }
    }
}