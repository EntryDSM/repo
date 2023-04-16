import { fileToImg } from "@/apis/file";
import { ChangeEvent, FormEvent, useState } from "react";

export type ProfileType =
  | "introduce"
  | "writer"
  | "skill_set"
  | "project_list"
  | "award_list"
  | "certificate_list";

const dummy =
  "data:image/jpeg;base64,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";

export const onChange = (
  setState: (value: string) => void,
  e: ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files) return;
  const file = e.target.files[0];
  const render = new FileReader();
  render.readAsDataURL(file);
  render.onloadend = async () => {
    // const { data } = await fileToImg("DOCUMENT", file);
    const { data } = await new Promise<{ data: string }>((resolve) => {
      setTimeout(() => resolve({ data: dummy }), 1000);
    });
    setState(data);
  };
};

export const onClickItem = <T>(
  state: T,
  value: { keyword: string; name: string }
) => {
  const { keyword, name } = value;
  return { ...state, [name]: keyword };
};

export const AddSkillFn = <T>(
  state: T,
  value: { keyword: string; name: string }
) => {
  const { keyword, name } = value;
  return {
    ...state,
    [name]: (state[name as keyof T] as Array<Object>).concat(keyword),
  };
};

export const removeSkillFn = <T>(
  state: T,
  value: { index: number; name: string }
) => {
  const { index, name } = value;
  const copy = { ...state }[name as keyof T] as Array<Object>;
  copy.splice(index, 1);
  return { ...state, [name]: copy };
};

const handleChangeFn = <T>(
  state: T,
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { value, name } = e.target;
  return { ...state, [name]: value };
};

export const useProfileWrite = <T extends Object>(
  initial: T,
  type: ProfileType
) => {
  const [state, setState] = useState<T>(initial);

  const onImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    onChange((value) => setState({ ...state, [name]: value }), e);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const temp = handleChangeFn(state, e);
    setState(temp);
  };

  const onDropdownSelect = (value: { keyword: string; name: string }) => {
    const temp = onClickItem(state, value);
    setState(temp);
  };

  const AddSKill = (value: { keyword: string; name: string }) => {
    const temp = AddSkillFn(state, value);
    setState(temp);
  };
  return { state, setState, handleChange };
};

export const useProfileWriteArray = <T extends Object>(
  initial: T,
  type: ProfileType
) => {
  const [state, setState] = useState<T[]>([initial]);

  const handleChange =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const copy = [...state];
      copy.splice(index, 1, handleChangeFn(state[index], e));
      setState(copy);
    };

  const addItem = () => {
    setState(state.concat(initial));
  };
  const removeItem = (index: number) => () => {
    const copy = [...state];
    copy.splice(index, 1);
    setState(copy);
  };

  return {
    state,
    setState,
    handleChange,
    addItem,
    removeItem,
  };
};
