using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.BookComment
{
    public class BookCommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; } = string.Empty;
        public int? BookId { get; set; }
    }
}