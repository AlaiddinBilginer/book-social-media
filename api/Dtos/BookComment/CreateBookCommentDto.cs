using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.BookComment
{
    public class CreateBookCommentDto
    {
        public string Content { get; set; } = string.Empty;
    }
}