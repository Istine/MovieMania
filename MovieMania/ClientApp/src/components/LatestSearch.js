import React from "react";

export const LatestSearch = React.memo((props) => {
  return (
    <button
      onClick={props.handleClick(props.q)}
      className="font-carrois text-[13px] border-solid border-[1px] border-slate-950 p-2 rounded-[10px]   font-sans transition duration-300 ease-in hover:border-[2px]"
      key={props.idx}
    >
      {props.q}
    </button>
  );
});
