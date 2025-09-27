using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Smolathon_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Значит URL будет https://localhost:12345/api/test
    public class TestController : ControllerBase
    {
        [HttpGet] // Этот метод будет вызываться на GET запрос
        public IActionResult GetMessage()
        {
            // Пока просто возвращаем текст в JSON формате
            var response = new { Message = "Привет от C# бэкенда! Данные из БД будут здесь!" };
            return Ok(response);
        }
    }
}