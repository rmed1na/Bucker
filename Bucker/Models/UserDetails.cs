using System;

namespace Bucker.Models
{
    public class UserDetails
    {
        public int Id { get; set; }
        public DateTime CreationDate { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
    }
}
