using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Nationality { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; }
        public DateTime DeathDate { get; set; }
        public List<Book> Books { get; set; } = new List<Book>();
        public List<AuthorComment> AuthorComments { get; set; } = new List<AuthorComment>();
    }
}