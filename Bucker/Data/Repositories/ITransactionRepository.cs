using Bucker.Data.Models;
using System.Threading.Tasks;

namespace Bucker.Data.Repositories
{
    public interface ITransactionRepository
    {
        Task AddAsync(Transaction transaction);
    }
}
