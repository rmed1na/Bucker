namespace Bucker.Data.Models
{
    public class Concept : ModelMeta
    {
        public int ConceptId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentConceptId { get; set; }
        public int? OwnerUserId { get; set; }

        public virtual Concept Parent { get; set; }
    }
}
