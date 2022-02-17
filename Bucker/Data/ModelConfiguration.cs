using Bucker.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bucker.Data
{
    internal class UserConfiguration : IEntityTypeConfiguration<User> 
    { 
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(x => x.UserId);
            builder.HasMany(x => x.Accounts).WithOne(y => y.Owner);
        }
    }

    internal class AccountConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.ToTable("Accounts");
            builder.HasKey(x => x.AccountId);
            builder.HasOne(x => x.Owner).WithMany(y => y.Accounts).HasForeignKey(x => x.OwnerUserId);
        }
    }

    internal class ConceptConfiguration : IEntityTypeConfiguration<Concept>
    {
        public void Configure(EntityTypeBuilder<Concept> builder)
        {
            builder.ToTable("Concepts");
            builder.HasKey(x => x.ConceptId);
        }
    }

    internal class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.ToTable("Transactions");
            builder.HasKey(x => x.TransactionId);
            builder.HasOne(x => x.Account).WithMany().HasForeignKey(x => x.AccountId);
            builder.HasOne(x => x.Concept).WithMany().HasForeignKey(x => x.ConceptId);
        }
    }

}
