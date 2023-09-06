using Microsoft.AspNetCore.Mvc;
using MovieMania.contracts;
using MovieMania.services;

namespace MovieMania.Controllers
{
    [ApiController]
    [Route("v1/search")]
    public class SearchController : ControllerBase
    {

        private readonly IMovieService movieService;
        public SearchController(IMovieService movieService) {
            this.movieService = movieService;
        }

        [HttpPost]
        public async Task<SearchType> GetMovies([FromBody] SearchItem body)
        {
            try { 
                  
            return await movieService.Execute(body.Title);
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }
          
        }

        

        [HttpGet]
        public async Task<List<string>> getSearchQueries()
        {
            try {
                return await movieService.getSearchQueries();
            }
            catch (Exception ex) {
                throw new Exception("Could not get data at this time.");
            }
        }

       
    }
}
