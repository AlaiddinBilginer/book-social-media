using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Book
{
    public class CreateBookRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public short Page { get; set; }
        public short PublicationDate { get; set; }
        public string Image { get; set; } = string.Empty;
        public int? AuthorId { get; set; }
    }
}