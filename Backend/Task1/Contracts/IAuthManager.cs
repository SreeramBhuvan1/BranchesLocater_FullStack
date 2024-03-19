using Microsoft.AspNetCore.Identity;
using Task1.Models.User;

namespace Task1.Contracts
{
    public interface IAuthManager
    {
        Task<IEnumerable<IdentityError>> Register(ApiUserDto userDto);
        Task<AuthResponseDto> Login(LoginDto loginDto);
    }
}
