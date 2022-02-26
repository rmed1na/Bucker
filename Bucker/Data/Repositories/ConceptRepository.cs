using Bucker.Data.Context;
using Bucker.Data.Models;
using Bucker.Models.Enums;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bucker.Data.Repositories
{
    public class ConceptRepository : IConceptRepository
    {
        private readonly IContext _context;

        public ConceptRepository(IContext context) => _context = context;

        public async Task AddAsync(Concept concept)
        {
            await _context.Concepts.AddAsync(concept);
            await _context.SaveChangesAsync();
        }

        public async Task<IList<Concept>> GetAllAsync(bool onlyActive = true)
        {
            return await _context.Concepts
                .Where(x => !onlyActive || x.StatusCode == GlobalStatusCode.Active)
                .ToListAsync();
        }

        public async Task<IList<Concept>> GetAllAsync(int userId)
        {
            return await _context.Concepts
                .Where(x => x.OwnerUserId.Value == userId)
                .ToListAsync();
        }

        public async Task<IList<Concept>> GetChildsAsync(int parentConceptId)
        {
            return await _context.Concepts
                .Where(x => x.ParentConceptId.HasValue && x.ParentConceptId.Value == parentConceptId)
                .ToListAsync();
        }
    }
}
