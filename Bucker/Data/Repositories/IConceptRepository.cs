using Bucker.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Bucker.Data.Repositories
{
    public interface IConceptRepository
    {
        Task AddAsync(Concept concept);
        Task<IList<Concept>> GetAllAsync(bool onlyActive = true);
        Task<IList<Concept>> GetAllAsync(int userId);
    }
}
