using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class AuthorsQueryObject : BaseQueryObject
    {
        public string? AuthorName { get; set; } = null;
    }
}