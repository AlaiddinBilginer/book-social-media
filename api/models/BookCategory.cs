using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    [Table("BookCategories")]
    public class BookCategory
    {
        public int BookId { get; set; }
        public Book? Book { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

    }
}