using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ReactTest.Models;
using ReactTest.Models.Requests;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace ReactTest.Services
{
    public class UserService
    {
        public User Authenticate(Login loginData)
        {
            User user = new User();
            user.UserId = loginData.User;
            user.Success = true;
            user.Token = GenerateToken(loginData.User);
            return user;            
        }
        public User AuthenticateToken(string userId)
        {
            User user = new User();
            if(userId == null)
            {
                user.Success = false;
                return user;
            }
            user.UserId = userId;
            user.Token = GenerateToken(userId);
            user.Success = true;
            return user;
        }
        private string GenerateToken(string user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("asjasdfjsafgsahgusafg*/656+");//turi buti in appsettings
            var tokenDesciper = new SecurityTokenDescriptor
            {
                Issuer = "https://localhost:5001/",//turi buti in appsettings
                Audience = "https://localhost:5001/",//turi buti in appsettings
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.ToString()),
                    new Claim(ClaimTypes.NameIdentifier, user.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDesciper);
            string newToken = tokenHandler.WriteToken(token);
            return newToken;
        }
    }
}