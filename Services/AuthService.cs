using Microsoft.EntityFrameworkCore;
using Smolathon_backend.DTOs;
using Smolathon_backend.Models;
using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;

namespace Smolathon_backend.Services
{
    public interface IAuthService
    {
        Task<UserDTO> LoginAsync(LoginDto loginDto);
        Task<UserDTO> RegisterAsync(LoginDto registerDto, string role = "user");
        bool VerifyPassword(string password, string storedHash);
    }
    public class AuthService:IAuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserDTO> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginDto.Username && u.IsActive);

            if (user == null)
                return null;

            if (!VerifyPassword(loginDto.Password, user.PasswordHash))
                return null;

            return new UserDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                Role = user.Role,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt
            };
        }
        public async Task<UserDTO> RegisterAsync(LoginDto registerDto, string role = "user")
        {
            if (await _context.Users.AnyAsync(u => u.Username == registerDto.Username))
                throw new Exception("Пользователь уже существует");

            var user = new User
            {
                Username = registerDto.Username,
                PasswordHash = HashPassword(registerDto.Password), // bcrypt для новых пользователей
                Role = role,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                Role = user.Role,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt
            };
        }

        // Используем bcrypt для проверки пароля
        public bool VerifyPassword(string password, string storedHash)
        {
            try
            {
                // Если хеш начинается с $2b$ - это bcrypt
                if (storedHash.StartsWith("$2"))
                {
                    return BCrypt.Net.BCrypt.Verify(password, storedHash);
                }
                else
                {
                    // Для старых хешей (если будут)
                    return HashPassword(password) == storedHash;
                }
            }
            catch
            {
                return false;
            }
        }

        // Для новых пользователей используем bcrypt
        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

    }
}
