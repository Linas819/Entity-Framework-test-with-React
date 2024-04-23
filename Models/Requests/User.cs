using System;

namespace ReactTest.Models.Requests
{
    public class User
    {
        public String Token { get; set; }
        public bool Success { get; set; }
        public String UserId { get; set; }
    }
}