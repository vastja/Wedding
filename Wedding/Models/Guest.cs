using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Wedding.Models
{
    public class Guest
    {
        [Key]
        [Required]
        [EmailAddress]
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [Column("first_name")]
        public string FirstName { get; set; }

        [Required]
        [Column("last_name")]
        public string LastName { get; set; }

        [Column("plus_one")]
        public bool PlusOne { get; set; } = false;

        [Column("help")]
        public bool Help { get; set; } = false;
    }
}

