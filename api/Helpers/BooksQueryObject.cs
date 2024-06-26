using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class BooksQueryObject : BaseQueryObject
    {
        public string? BookName { get; set; } = null;
        public string? SortBy { get; set; } = null;
        public int? CategoryId { get; set; } = null;
        public bool IsDescending { get; set; } = false;
    }
}