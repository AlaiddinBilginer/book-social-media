using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Book
{
    public class UpdateBookRequestDto
    {
        [Required]
        [MaxLength(200, ErrorMessage = "Name can't be longer than 200 characters.")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MaxLength(4000, ErrorMessage = "Description can't be longer than 4000 characters.")]
        public string Description { get; set; } = string.Empty;
        [Required]
        [Range(1, 5000, ErrorMessage = "Page must be between 1 and 5000.")]
        public short Page { get; set; }
        [Required]
        [Range(1, 2100, ErrorMessage = "Publication Date must be between 1 and 2100.")]
        public short PublicationDate { get; set; }
        [Required]
        [Url(ErrorMessage = "Image must be a valid URL.")]
        public string Image { get; set; } = string.Empty;
        [Required]
        public int? AuthorId { get; set; }
    }
}