namespace Bucker.Data.Models
{
    public class Account : ModelMeta
    {
        public int AccountId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int OwnerUserId { get; set; }

        public virtual User Owner { get; set; }
    }
}
