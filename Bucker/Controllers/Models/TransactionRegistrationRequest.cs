using System;

namespace Bucker.Controllers.Models
{
    public class TransactionRegistrationRequest
    {
        public decimal Amount { get; set; }
        public int ConceptId { get; set; }
        public int AccountId { get; set; }
        public string Description { get; set; }
        public DateTime? EffectiveDate { get; set; }
    }
}
