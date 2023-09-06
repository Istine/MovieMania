namespace MovieMania.contracts
{
    public class Movie
    {
        public string Title { get; set; }
        public string Year { get; set; }
        public string ImdbID { get; set; }
        public string Poster { get; set; }
        public string Type { get; set; }

        public Movie(string title, string year, string imdbID, string poster, string type)
        {
            Title = title;
            Year = year;
            ImdbID = imdbID;
            Poster = poster;
            Type = type;
        }
    }

    public class SearchType
    {
        public Movie[] Search { get; set; }

        public SearchType(Movie[] search)
        {
            Search = search;
        }
    }
}
