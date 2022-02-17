using Bucker.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Bucker.Data.Context
{
    public class Context : DbContext, IContext
    {
        #region Sets
        public DbSet<User> Users { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Concept> Concepts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        #endregion

        public Context(DbContextOptions options) : base(options) { }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) => base.SaveChangesAsync(cancellationToken);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            CreateModels(modelBuilder);
        }

        #region Private
        private void CreateModels(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new AccountConfiguration());
            builder.ApplyConfiguration(new ConceptConfiguration());
            builder.ApplyConfiguration(new TransactionConfiguration());
        }
        #endregion
    }
}
