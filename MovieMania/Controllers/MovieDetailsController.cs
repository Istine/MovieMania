using Microsoft.AspNetCore.Mvc;
using MovieMania.contracts;
using MovieMania.services;

namespace MovieMania.Controllers
{
    [ApiController]
    [Route("v1/search/{Title}")]
    public class MovieDetailsController:ControllerBase
    {

        private readonly IMovieService movieService;
        public MovieDetailsController(IMovieService movieService)
        {
            this.movieService = movieService;
        }

        [HttpGet]
        public async Task<MovieDetails> getMovieDetails([FromRoute(Name = "Title")] string route) 
        {
            try
            {
                return await movieService.GetMovieDetails(route);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Something went wrong. Try again");
            }
        }
    }
}
