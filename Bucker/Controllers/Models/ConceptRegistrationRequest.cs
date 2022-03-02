namespace Bucker.Controllers.Models
{
    public class ConceptRegistrationRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentId { get; set; }
        public int? OwnerUserId { get; set; }
    }
}
