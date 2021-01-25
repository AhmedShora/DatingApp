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

    }
}
