using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Author;
using api.models;

namespace api.Mappers
{
    public static class AuthorMappers
    {
        public static AuthorDto ToAuthorDto(this Author authorModel)
        {
            return new AuthorDto
            {
                Id = authorModel.Id,
                Name = authorModel.Name,
                Image = authorModel.Image,
                Description = authorModel.Description,
                Nationality = authorModel.Nationality,
                BirthDate = authorModel.BirthDate,
                DeathDate = authorModel.DeathDate,
                Books = authorModel.Books.Select(b => b.ToBookDto()).ToList(),
                Comments = authorModel.AuthorComments.Select(c => c.ToAuthorCommentDto()).ToList()
            };
        }

        public static Author ToAuthorFromCreateDto(this CreateAuthorRequestDto authorDto)
        {
            return new Author
            {
                Name = authorDto.Name,
                Image = authorDto.Image,
                Description = authorDto.Description,
                Nationality = authorDto.Nationality,
                BirthDate = authorDto.BirthDate,
                DeathDate = authorDto.DeathDate
            };
        }

        public static Author ToAuthorFromUpdateDto(this UpdateAuthorRequestDto authorDto)
        {
            return new Author
            {
                Name = authorDto.Name,
                Image = authorDto.Image,
                Description = authorDto.Description,
                Nationality = authorDto.Nationality,
                BirthDate = authorDto.BirthDate,
                DeathDate = authorDto.DeathDate
            };
        }
    }
}