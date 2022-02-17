using Bucker.Data.Context;
using Bucker.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bucker.Data.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IContext _context;

        public AccountRepository(IContext context) => _context = context;

        public async Task<Account> AddUserAccountAsync(Account account)
        {
            await _context.Accounts.AddAsync(account);
            await _context.SaveChangesAsync();

            return account;
        }

        public async Task<IList<Account>> GetUserAccountsAsync(int userId)
        {
            return await _context.Accounts.Where(x => x.OwnerUserId == userId).ToListAsync();
        }

        public async Task<IList<Account>> GetUserAccountsAsync(string email)
        {
            return await _context.Accounts.Where(x => x.Owner.Email.ToLower() == email.ToLower()).ToListAsync();
        }

        public async Task<Account> GetAccountAsync(int accountId)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.AccountId == accountId);
        }

        public async Task<Account> UpdateAccountAsync(Account account)
        {
            account.UpdatedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return account;
        }
    }
}
