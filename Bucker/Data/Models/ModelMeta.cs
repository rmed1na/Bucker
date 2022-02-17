using Bucker.Models.Enums;
using System;

namespace Bucker.Data.Models
{
    public class ModelMeta
    {
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public GlobalStatusCode StatusCode { get; set; }

        public ModelMeta()
        {
            CreatedDate = DateTime.UtcNow;
            StatusCode = GlobalStatusCode.Active;
        }
    }
}
