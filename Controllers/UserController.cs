using Microsoft.AspNetCore.Mvc;
using ReactTest.Models;
using ReactTest.Services;
using System.Security.Claims;

namespace ReactTest.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private UserService userService;
        public UserController(UserService userService)
        {
            this.userService = userService;
        }
        [HttpPost]
        public IActionResult Login([FromBody] Login loginData)
        {
            var user = userService.Authenticate(loginData);
            return Ok(user);
        }
        [HttpGet]
        [Route("loginToken")]
        public IActionResult LoginToken()
        {
            string userId = User.FindFirst(ClaimTypes.Name)?.Value;
            var user = userService.AuthenticateToken(userId);
            return Ok(user);
        }
    }
}