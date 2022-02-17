using Bucker.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bucker.Data.Repositories
{
    public interface IAccountRepository
    {
        public Task<Account> AddUserAccountAsync(Account account);
        public Task<IList<Account>> GetUserAccountsAsync(int userId);
        public Task<IList<Account>> GetUserAccountsAsync(string email);
        public Task<Account> GetAccountAsync(int accountId);
        public Task<Account> UpdateAccountAsync(Account account);
    }
}
