using Crypt = BCrypt.Net.BCrypt;

namespace Bucker.Utilities
{
    public static class PasswordUtility
    {
        public static string HashPassword(string password) => Crypt.HashPassword(password);

        public static bool VerifyPassword(string raw, string hashed)
        {
            return Crypt.Verify(raw, hashed);
        }
    }
}
