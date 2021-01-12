using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;

namespace API.Controllers
{
    public class AccountController : APIBaseController
    {
        private readonly DataContext _context;
        private readonly ITokenService __tokenService;
        public AccountController(DataContext context, ITokenService _tokenService)
        {
            __tokenService = _tokenService;
            _context = context;

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UsernameExist(registerDto.Username)) return BadRequest("Username already exist");
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto
            {
                userName = user.UserName,
                token = __tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UsernameExist(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync<AppUser>(x => x.UserName == loginDto.Username);
            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int idx = 0; idx < ComputeHash.Length; idx++)
            {
                if (ComputeHash[idx] != user.PasswordHash[idx]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                userName = user.UserName,
                token = __tokenService.CreateToken(user)
            };
        }
    }
}