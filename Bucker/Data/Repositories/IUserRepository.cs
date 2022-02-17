using Bucker.Data.Models;
using System;
using System.Threading.Tasks;

namespace Bucker.Data.Repositories
{
    public interface IUserRepository
    {
        public Task AddUserAsync(User user);
        public Task<User> AuthenticateSafeAsync(string email, string password);
        public Task<User> GetByEmailAsync(string email);
        public Task<User> SaveAsync(User user);
    }
}
