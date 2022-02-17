namespace Bucker.Controllers.Models
{
    public class UserAuthenticationResult
    {
        public bool IsAuthenticated { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
