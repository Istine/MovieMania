using MovieMania.contracts;
using MovieMania.models;
using Postgrest.Responses;
using System.IO;
using System.Text.Json;

namespace MovieMania.services
{
    public class MovieService:IMovieService
    {
        private IHttpClientFactory? _httpClientFactory;
        private readonly Supabase.Client client;

        public MovieService(IHttpClientFactory httpClientFactory, Supabase.Client client)
        {
            _httpClientFactory = httpClientFactory;
            this.client = client;

        }

        public async Task<SearchType> Execute(string Title) {
            await UpSert(Title);
            return await GetMovies(Title);
        }
        

        private async Task<SearchType> GetMovies(string Title)
        {
            
            var httpClient = _httpClientFactory.CreateClient();
            using (var  response = await httpClient.GetAsync($"http://www.omdbapi.com/?i=tt3896198&apikey=a243b089&s={Title}", HttpCompletionOption.ResponseHeadersRead))
            {
                response.EnsureSuccessStatusCode();
                var stream = await response.Content.ReadAsStreamAsync();

                return await JsonSerializer.DeserializeAsync<SearchType>(stream);
                
            }
        }

        public async Task<long> UpSert(string Query)
        {
            var searchQuery = new SearchQuery
            {
                Title = Query,
                date = DateTime.Now,
            };
            var results = await client.From<SearchQuery>().Get();
            if(results.Models.Count >= 5) {
                var Id = results.Models.First().Id;
                await client.From<SearchQuery>()
                    .Where(x => x.Id == Id)
                    .Delete();
            }

            var response = await client.From<SearchQuery>().Insert(searchQuery);
            return response.Models.First().Id;

        }

        public async Task<List<string>> getSearchQueries() {

            var response = await client.From<SearchQuery>()
                .Get();
            var responseModel = new List<string>();
            response.Models.ForEach(doc =>
            {
                responseModel.Add(doc.Title);
            });
            return responseModel;
                
        }

        public async Task<MovieDetails> GetMovieDetails(string Title)
        {
            var httpClient = _httpClientFactory.CreateClient();
            using (var response = await httpClient.GetAsync($"http://www.omdbapi.com/?apikey=a243b089&t={Title}", HttpCompletionOption.ResponseHeadersRead))
            {
                response.EnsureSuccessStatusCode();
                var stream = await response.Content.ReadAsStreamAsync();

                return await JsonSerializer.DeserializeAsync<MovieDetails>(stream);

            }
        }

        Task<SearchType> IMovieService.GetMovies(string Title)
        {
            throw new NotImplementedException();
        }

    }

    public interface IMovieService
    {
        public Task<SearchType> Execute(string Title);
        public Task<SearchType> GetMovies(string Title);
        Task<long> UpSert(string Query);

        Task<List<string>> getSearchQueries();

        Task<MovieDetails> GetMovieDetails(string Title);

    }
}

