using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Bucker.Data.Models
{
    public class User : ModelMeta
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateTime? LastLogin { get; set; }

        public virtual IList<Account> Accounts { get; set; }

        public string GetFullName()
        {
            return new StringBuilder()
                .Append(FirstName)
                .Append(' ')
                .Append(LastName)
                .ToString();
        }
    }
}
