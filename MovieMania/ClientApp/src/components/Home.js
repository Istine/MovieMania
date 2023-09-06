import React from "react";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { getLatestSearches, getMovies } from "../httpRequest";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearches,
  setMovies,
  setLoading,
  setErrorStatus,
} from "../store/features/MoviesSlice";
import { Link, useSearchParams } from "react-router-dom";
import { LatestSearch } from "./LatestSearch";
import {
  ERROR_HEADINGS,
  ERROR_MESSAGES,
  localStore,
  scrollPageBy,
} from "../utils";

export const Home = () => {
  const defaultMovies = useSelector((state) => state.movie.movies || []);
  const searchQueries = Array.from(
    new Set(useSelector((state) => state.movie.searches))
  );

  const [searchParams] = useSearchParams();

  const isLoading = useSelector((state) => state.movie.isLoading);

  const dispatch = useDispatch();

  const getDeFaultMovies = async (
    query = localStore.valueOf("search") || "The Avengers",
    initialLoadAlreadyExecuted = true
  ) => {
    try {
      dispatch(setLoading(true));
      if (searchParams.get("reload") && initialLoadAlreadyExecuted) {
        scrollPageBy("top", 500);
        return;
      }
      if (!query) return;
      const response = await getMovies(query);
      if (response.ok) {
        const movies = await response.json();
        if (!movies.search) return;
        dispatch(setMovies(movies.search));
        scrollPageBy("top", 500);
        const searchQueriesResponse = await getLatestSearches();
        const searchQueries = await searchQueriesResponse.json();
        dispatch(setSearches(searchQueries));
      } else {
        throw new Error("Service is Unavailable");
      }
    } catch (error) {
      dispatch(
        setErrorStatus({
          status: true,
          heading: ERROR_HEADINGS.SERVICE_UNAVAILABLE,
          message: ERROR_MESSAGES.SERVICE_UNAVAILABLE,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClick = React.useCallback((q) => {
    return async (e) => {
      localStore.set("search", q);
      await getDeFaultMovies(q, false);
    };
  }, []);

  React.useEffect(() => {
    getDeFaultMovies();
  }, []);

  return (
    <div className="w-full h-full z-1">
      <div className="phone:hidden w-full h-[400px] relative laptop:flex">
        <div className="w-full h-full absolute top-0 left-0 opacity-[.5] bg-slate-950"></div>
        <img
          src="/avengers.webp"
          className="w-1/3 h-full object-cover object-top"
        />
        <img
          src="/john-wick.webp"
          className="w-1/3 h-full object-cover object-top"
        />
        <img
          src="/ahsoka.jpeg"
          className="w-1/3 h-full object-cover object-top"
        />
      </div>
      {!isLoading && (
        <div className="w-full p-10">
          <h3 className="text-[30px]">Recent Searches</h3>
          <div className="phone:w-full overflow-x-hidden grid grid-cols-2 items-center gap-2 py-2 h-auto laptop:grid-cols-5 tablet:grid-cols-3 laptop:w-2/3">
            {searchQueries.map((q, idx) => (
              <LatestSearch
                key={idx}
                handleClick={handleClick}
                q={q}
                idx={idx}
              />
            ))}
          </div>
        </div>
      )}
      <div
        id="movies"
        className="phone:grid grid-cols-1 gap-2 w-full overflow-x-hidden min-h-[400px] relative z-1 tablet:grid-cols-2 laptop:grid-cols-5"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          defaultMovies.map((movie, idx) => (
            <Link to={`/movie/${movie.title}`} key={idx}>
              <Card key={idx} movie={movie} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
