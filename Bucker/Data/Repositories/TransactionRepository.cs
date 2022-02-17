using Bucker.Data.Context;
using Bucker.Data.Models;
using System.Threading.Tasks;

namespace Bucker.Data.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly IContext _context;

        public TransactionRepository(IContext context) => _context = context;

        public async Task AddAsync(Transaction transaction)
        {
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
        }
    }
}
