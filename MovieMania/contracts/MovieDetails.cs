namespace MovieMania.contracts
{
    public class MovieDetails
    {
        
        public string Title { get; set; }
        public string Year { get; set; }
        public string Rated { get; set; }
        public string Released { get; set; }

        public string Runtime { get; set; }

        public string Genre { get; set; }

        public string Director { get; set; }

        public string Writer { get; set; }

        public string Actors { get; set; }

        public string Plot { get; set; }

        public string Language {  get; set; }
        public string Country { get; set; }
        public string Awards { get; set; }

        public string Poster { get; set; }

        public Rating[] Ratings { get; set; }

        public string Metascore { get; set; }

        public string imdbRating { get; set; }

        public string imdbVotes { get; set;}

        public string imdbID { get; set; }

        public string Type { get; set; }

        public string DVD {  get; set; }

        public string BoxOffice { get; set; }

        public string Production {  get; set; }

        public string Website { get; set;}

        public string Response { get; set; }

        public MovieDetails(string title, string year, string rated, string released, string runtime, string genre, string director, string writer, string actors, string plot, string language, string country, string awards, string poster, Rating[] ratings, string metascore, string imdbRating, string imdbVotes, string imdbID, string type, string dVD, string boxOffice, string production, string website, string response)
        {
            Title = title;
            Year = year;
            Rated = rated;
            Released = released;
            Runtime = runtime;
            Genre = genre;
            Director = director;
            Writer = writer;
            Actors = actors;
            Plot = plot;
            Language = language;
            Country = country;
            Awards = awards;
            Poster = poster;
            Ratings = ratings;
            Metascore = metascore;
            this.imdbRating = imdbRating;
            this.imdbVotes = imdbVotes;
            this.imdbID = imdbID;
            Type = type;
            DVD = dVD;
            BoxOffice = boxOffice;
            Production = production;
            Website = website;
            Response = response;
        }


    }

    public class Rating
    {
        public string Source { get; set; }

        public string Value { get; set; }

        public Rating(string source, string value)
        {
            Source = source;
            Value = value;
        }
    }
}
