import { useState } from "react";

export const useInversion = () => {
  const [state, setState] = useState(true);

  const correct = () => {
    setState(true);
  };

  const inCorrect = () => {
    setState(false);
  };

  return {
    state,
    correct,
    inCorrect,
  };
};
