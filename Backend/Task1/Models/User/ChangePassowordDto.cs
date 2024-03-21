using System.ComponentModel.DataAnnotations;

namespace Task1.Models.User
{
    public class ChangePassowordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(15, ErrorMessage = " Your Password is limited to {2} to {1} characters", MinimumLength = 6)]
        public string OldPassword { get; set; }
        [Required]
        [StringLength(15, ErrorMessage = " Your Password is limited to {2} to {1} characters", MinimumLength = 6)]
        public string NewPassword { get; set; }

    }
}
