using Bucker.Controllers.Models;
using Bucker.Data.Models;
using Bucker.Data.Repositories;
using Bucker.Models;
using Bucker.Models.Enums;
using Bucker.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Bucker.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;

        public readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository, IOptions<JwtSettings> jwtSettings)
        {
            _userRepository = userRepository;
            _jwtSettings = jwtSettings.Value;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterUserAsync(UserRegistrationRequest request)
        {
            ValidateUserRegistrationRequest(request);
            await _userRepository.AddUserAsync(new User
            {
                Username = request.Username,
                Email = request.Email,
                Password = PasswordUtility.HashPassword(request.Password)
            });

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public async Task<IActionResult> AuthenticateAsync(UserAuthenticationRequest request)
        {
            ValidateUserAuthenticationRequest(request);
            var result = new UserAuthenticationResult 
            { 
                IsAuthenticated = false
            };

            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (user != null && PasswordUtility.VerifyPassword(request.Password, user.Password))
            {
                result.IsAuthenticated = true;
                result.Username = user.Username;
                result.Email = user.Email;

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim("userId", user.UserId.ToString()),
                        new Claim(ClaimTypes.Name, user.GetFullName())
                    }),
                    Expires = DateTime.UtcNow.AddHours(3),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                result.Token = tokenHandler.WriteToken(token);

                user.LastLogin = DateTime.UtcNow;
                await _userRepository.SaveAsync(user);

                return Ok(result);
            }

            return Unauthorized(result);
        }

        [HttpGet]
        [Route("details/email/{email}")]
        public async Task<IActionResult> GetUserDetails(string email)
        {
            var result = new UserDetails();
            var user = await _userRepository.GetByEmailAsync(email);

            if (user != null)
            {
                result.Id = user.UserId;
                result.CreationDate = user.CreatedDate;
                result.Username = user.Username;
                result.Email = user.Email;
                result.FirstName = user.FirstName;
                result.LastName = user.LastName;
                result.IsActive = user.StatusCode == GlobalStatusCode.Active;
            }

            return Ok(result);
        }

        #region Private
        private static void ValidateUserRegistrationRequest(UserRegistrationRequest request)
        {
            if (string.IsNullOrEmpty(request.Username))
                throw new ArgumentException($"{nameof(request.Username)} must be defined");

            if (string.IsNullOrEmpty(request.Email))
                throw new ArgumentException($"{nameof(request.Email)} must be defined");

            if (string.IsNullOrEmpty(request.Password))
                throw new ArgumentException($"{nameof(request.Password)} must be defined");
        }
        private static void ValidateUserAuthenticationRequest(UserAuthenticationRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
                throw new ArgumentException($"{nameof(request.Email)} must be defined");

            if (string.IsNullOrEmpty(request.Password))
                throw new ArgumentException($"{nameof(request.Password)} must be defined");
        }
        #endregion
    }
}
