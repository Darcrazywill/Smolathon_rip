using Microsoft.AspNetCore.Mvc;
using Smolathon_backend.Services;
using Smolathon_backend.DTOs;

namespace Smolathon_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var user = await _authService.LoginAsync(loginDto);

                if (user == null)
                    return Unauthorized(new { message = "Неверное имя пользователя или пароль" });

                // Сохраняем пользователя в сессии (упрощённо)
                HttpContext.Session.SetString("UserId", user.UserId.ToString());
                HttpContext.Session.SetString("Username", user.Username);
                HttpContext.Session.SetString("Role", user.Role);

                return Ok(new
                {
                    message = "Вход выполнен успешно",
                    user = user
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginDto registerDto)
        {
            try
            {
                var user = await _authService.RegisterAsync(registerDto);
                return Ok(new
                {
                    message = "Регистрация выполнена успешно",
                    user = user
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { message = "Выход выполнен" });
        }

        [HttpGet("current")]
        public IActionResult GetCurrentUser()
        {
            var userId = HttpContext.Session.GetString("UserId");
            var username = HttpContext.Session.GetString("Username");
            var role = HttpContext.Session.GetString("Role");

            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Пользователь не авторизован" });

            return Ok(new
            {
                UserId = int.Parse(userId),
                Username = username,
                Role = role
            });
        }
    }
}
