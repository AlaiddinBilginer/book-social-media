using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AuthorComment
{
    public class UpdateAuthorCommentDto
    {
        [Required]
        [MaxLength(600, ErrorMessage = "Content cannot be over 600 characters")]
        public string Content { get; set; } = string.Empty;
    }
}