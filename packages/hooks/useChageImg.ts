import { ChangeEvent, useState } from "react";

export const useChangeImg = () => {
  const [state, setState] = useState<string | File>("");

  const setInitData = (initial: string) => setState(initial);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = () => {
      setState(file);
    };
  };
  return { state, setInitData, onChange } as const;
};
