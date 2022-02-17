using System;

namespace Bucker.Data.Models
{
    public class Transaction : ModelMeta
    {
        public int TransactionId { get; set; }
        public decimal Amount { get; set; }
        public DateTime EffectiveDate { get; set; }
        public string Description { get; set; }
        public int ConceptId { get; set; }
        public int AccountId { get; set; }

        public virtual Concept Concept { get; set; }
        public virtual Account Account { get; set; }
    }
}
