import { fileToImg } from "@/apis/fileToUrl";
import { ChangeEvent, FormEvent, useState } from "react";

export type ProfileType =
  | "introduce"
  | "writer"
  | "skill_set"
  | "project_list"
  | "award_list"
  | "certificate_list";

const onChange = (
  setState: (value: string) => void,
  e: ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files) return;
  const file = e.target.files[0];
  const render = new FileReader();
  render.readAsDataURL(file);
  render.onloadend = async () => {
    const { data } = await fileToImg("DOCUMENT", file);

    setState(data);
  };
};

const handleChangeFn = <T>(state: T, e: ChangeEvent<HTMLInputElement>) => {
  const { value, name } = e.target;
  return { ...state, [name]: value };
};

const onClickItem = <T>(state: T, value: { keyword: string; name: string }) => {
  const { keyword, name } = value;
  return { ...state, [name]: keyword };
};

const AddSkillFn = <T>(state: T, value: { keyword: string; name: string }) => {
  const { keyword, name } = value;
  return { ...state, [name]: (state[name] as Array<Object>).concat(keyword) };
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
  return { state, onDropdownSelect, onImgChange, handleChange, AddSKill };
};

export const useProfileWriteArray = <T extends Object>(
  initial: T,
  type: ProfileType
) => {
  const [state, setState] = useState<T[]>([initial]);

  const onImgChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const copy = [...state];

    onChange((value) => {
      copy.splice(index, 1, { ...state, [name]: value });
      setState(copy as T);
    }, e);
  };

  const handleChange =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const copy = [...state];
      copy.splice(index, 1, handleChangeFn(state, e));
      setState(copy);
    };

  const onDropdownSelect =
    (index: number) => (value: { keyword: string; name: string }) => {
      const copy = [...state];
      copy.splice(index, 1, onClickItem(state, value));
      setState(copy);
    };

  const AddSKill =
    (index: number) => (value: { keyword: string; name: string }) => {
      const copy = [...state];
      copy.splice(index, 1, AddSkillFn(state[index], value));
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
    onDropdownSelect,
    onImgChange,
    handleChange,
    AddSKill,
    addItem,
    removeItem,
  };
};
