using Postgrest.Attributes;
using Postgrest.Models;

namespace MovieMania.models
{
    
    [Table("searchQueries")]
    public class SearchQuery:BaseModel
    {
        [PrimaryKey("id", false)]
        public long Id { get; set; }

        [Column("searchQuery")]
        public string? Title { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt {  get; set; }

        [Column("date")]
        public DateTime date { get; set; }
    }
}
