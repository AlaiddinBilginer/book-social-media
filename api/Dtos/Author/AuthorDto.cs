using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AuthorComment;
using api.Dtos.Book;

namespace api.Dtos.Author
{
    public class AuthorDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Nationality { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
        public DateTime? DeathDate { get; set; }
        public List<BookDto> Books { get; set; } = new List<BookDto>();
        public List<AuthorCommentDto> Comments { get; set; }
    }
}