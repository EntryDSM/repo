import { useState } from "react";

export const useInversion = () => {
  const [state, setState] = useState(false);

  const correct = () => {
    setState(true);
  };

  const inCorrect = () => {
    setState(false);
  };

  const inversion = () => {
    setState(!state);
  };

  return {
    state,
    correct,
    inCorrect,
    inversion,
  };
};
