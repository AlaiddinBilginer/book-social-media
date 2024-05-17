using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public short Page { get; set; }
        public short PublicationDate { get; set; }
        public string Image { get; set; } = string.Empty;
        public int? AuthorId { get; set; }
        public Author? Author { get; set; }
        public List<BookComment> BookComments { get; set; } = new List<BookComment>();
        public List<BookCategory> BookCategories { get; set; } = new List<BookCategory>();
    }
}