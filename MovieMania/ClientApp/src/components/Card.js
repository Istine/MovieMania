import React from "react";

export const Card = (props) => {
  return (
    <div className="flex flex-col h-auto items-center px-[2rem]">
      <img
        loading="lazy"
        className="phone:object-cover w-full h-[350px] object-center laptop:object-contain laptop:h-[200px] "
        src={
          props.movie.poster !== "N/A"
            ? props.movie.poster
            : "/movie-placeholder.png"
        }
        alt={props.title}
      />
      <h3 className="text-center font-sans text-lg text-slate-950">
        {props.movie.title}
      </h3>
    </div>
  );
};
