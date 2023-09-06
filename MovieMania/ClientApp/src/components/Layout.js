import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useDispatch } from "react-redux";
import {
  setErrorStatus,
  setLoading,
  setMovies,
  setSearches,
} from "../store/features/MoviesSlice";
import { getLatestSearches, getMovies } from "../httpRequest";
import { useDidUpdateEffect } from "../hooks/useDidUpdateEffect";
import { useNavigate } from "react-router-dom";
import { Error } from "./Error";
import {
  ERROR_HEADINGS,
  ERROR_MESSAGES,
  localStore,
  scrollPageBy,
} from "../utils";

export const Layout = (props) => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  const getMoviesBySearch = async () => {
    try {
      dispatch(setLoading(true));
      if (!debouncedValue) return;
      localStore.set("search", debouncedValue);
      const moviesResponse = await getMovies(debouncedValue);
      if (moviesResponse.ok) {
        const movies = await moviesResponse.json();
        dispatch(setMovies(movies.search));
        const searchesResponse = await getLatestSearches();
        const searches = await searchesResponse.json();
        dispatch(setSearches(searches));
        if (location.pathname !== "/") {
          navigate("/?reload=false");
        }
        scrollPageBy("top", 500);
      } else {
        throw new Error("Cannot access service at the moment");
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

  useDidUpdateEffect(getMoviesBySearch, debouncedValue);

  return (
    <>
      <Error />
      <div className="w-full mx-auto max-w-[1400px]">
        <nav className="phone:shadow-md bg-white w-full  p-2 flex flex-col sticky top-0 z-10 laptop:flex-row">
          <Link to="/" className="no-underline cursor-pointer">
            <h2 className="phone: mb-2 font-sans text-[30px] text-[#f05d0e] font-bold laptop:mb-0">
              MovieMania
            </h2>
          </Link>
          <input
            placeholder="Ex. John Wick"
            type="text"
            onChange={handleSearch}
            className="phone: w-full  bg-[#ebebebe6] border-slate-950 rounded-[4px] outline-none py-2 px-4 focus:border-solid focus:border-2 tablet:w-3/4 laptop:w-1/3 laptop:ml-20"
          />
        </nav>
        <div className="w-full h-auto">{props.children}</div>
      </div>
    </>
  );
};
