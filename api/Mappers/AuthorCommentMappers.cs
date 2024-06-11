using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AuthorComment;
using api.models;

namespace api.Mappers
{
    public static class AuthorCommentMappers
    {
        public static AuthorCommentDto ToAuthorCommentDto(this AuthorComment authorCommentModel)
        {
            return new AuthorCommentDto
            {
                Id = authorCommentModel.Id,
                Content = authorCommentModel.Content,
                CreatedOn = authorCommentModel.CreatedOn,
                CreatedBy = authorCommentModel.AppUser.UserName,
                AuthorId = authorCommentModel.AuthorId
            };
        }

        public static AuthorComment ToAuthorCommentFromCreateDto(this CreateAuthorCommentDto commentDto, int authorId)
        {
            return new AuthorComment
            {
                Content = commentDto.Content,
                AuthorId = authorId
            };
        }

        public static AuthorComment ToAuthorCommentFromUpdateDto(this UpdateAuthorCommentDto commentDto)
        {
            return new AuthorComment
            {
                Content = commentDto.Content,
            };
        }
    }
}