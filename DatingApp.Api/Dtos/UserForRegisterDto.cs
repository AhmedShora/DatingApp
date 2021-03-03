using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Api.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage ="You must enter user name!")]
        public string UserName { get; set; }
        [Required(ErrorMessage ="You must enter password!")]
        [StringLength(maximumLength:8,MinimumLength =4,ErrorMessage ="Password must be between 4 and 8")]
        public string Password { get; set; }
        // public string ConfirmPassword { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }

    }
}
