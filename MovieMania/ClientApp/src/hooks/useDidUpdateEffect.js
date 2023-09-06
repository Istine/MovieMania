import React from "react";

export const useDidUpdateEffect = (fn, inputs) => {
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else didMountRef.current = true;
  }, [inputs]);
};
