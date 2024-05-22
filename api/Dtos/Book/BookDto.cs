using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BookComment;

namespace api.Dtos.Book
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public short Page { get; set; }
        public short PublicationDate { get; set; }
        public string Image { get; set; } = string.Empty;
        public int? AuthorId { get; set; }
        public List<BookCommentDto> Comments { get; set; }
    }
}