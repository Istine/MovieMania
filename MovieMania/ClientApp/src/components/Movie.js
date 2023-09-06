import React from "react";
import { useParams } from "react-router-dom";
import { getDetailsAboutMovie } from "../httpRequest";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMovie, setLoading } from "../store/features/MoviesSlice";
import { Spinner } from "./Spinner";
import { scrollPageBy } from "../utils";

const FILTERS = [
  "title",
  "ratings",
  "poster",
  "metascore",
  "imdbID",
  "response",
  "website",
  "production",
  "dvd",
  "imdbVotes",
];

export const Movie = () => {
  const { Title } = useParams();
  const currentMovie = useSelector((state) => state.movie.currentMovie);
  const isLoading = useSelector((state) => state.movie.isLoading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getDetails = async () => {
      try {
        if (!Title) return;
        dispatch(setLoading(true));
        const response = await getDetailsAboutMovie(Title);
        if (response.ok) {
          const data = await response.json();
          if (!Object.entries(data).length) return;
          dispatch(setCurrentMovie(data));
          scrollPageBy("top");
        } else {
          throw new Error("could not get details for this movie");
        }
      } catch (error) {
      } finally {
        dispatch(setLoading(false));
      }
    };
    getDetails();
  }, [Title]);

  const keys = Object.keys(currentMovie).filter((k) => !FILTERS.includes(k));
  const Elms = keys.map((k, idx) => (
    <p className="m-0 mb-1" key={idx}>
      {k}:{currentMovie[k]}
    </p>
  ));

  return (
    <div className="w-full relative">
      <div className="phone:flex flex-col w-full min-h-[300px] p-4 tablet:flex-row">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <img
              className="phone:w-full mb-4 shadow-xl rounded-[4px] max-h-[500px] tablet:mb-0 laptop:w-2/5  desktop:max-h-[700px]"
              src={
                currentMovie.poster !== "N/A"
                  ? currentMovie.poster
                  : "/movie-placeholder.png"
              }
              alt={currentMovie.title}
            />
            <div className="phone:w-full px-2 h-full mt-auto mx-auto text-[14px] font-carrois flex flex-col laptop:w-2/5 desktop:text-[18px]">
              <p className="phone:text-[20px] desktop:text-[30px]">
                Title:{currentMovie.title}
              </p>
              {Elms}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
