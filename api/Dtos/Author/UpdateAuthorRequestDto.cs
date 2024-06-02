using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Author
{
    public class UpdateAuthorRequestDto
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Name can't be longer than 100 characters.")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [Url(ErrorMessage = "Image must be a valid URL.")]
        public string Image { get; set; } = string.Empty;
        [Required]
        [MaxLength(5000, ErrorMessage = "Description can't be longer than 5000 characters.")]
        public string Description { get; set; } = string.Empty;
        [Required]
        [MaxLength(50, ErrorMessage = "Nationality can't be longer than 50 characters.")]
        public string Nationality { get; set; } = string.Empty;
        [Required]
        [DataType(DataType.Date, ErrorMessage = "BirthDate must be a valid date.")]
        public DateTime BirthDate { get; set; }
        [DataType(DataType.Date, ErrorMessage = "DeathDate must be a valid date.")]
        public DateTime? DeathDate { get; set; }
    }
}