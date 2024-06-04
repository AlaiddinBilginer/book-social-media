using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class BookCommentQueryObject
    {
        public int BookId { get; set; }
        public bool IsDecsending { get; set; } = true;
    }
}