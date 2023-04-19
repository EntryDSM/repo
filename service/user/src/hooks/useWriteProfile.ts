import { myDetail } from "@/apis/document/get/myDetail";
import {
  documnetProject,
  ProjectReqBody,
  ProjectResType,
  documnetIntroduce,
  IntroduceReqBody,
  IntroduceResType,
  documnetCertificate,
  CertificateReqBody,
  CertificateResType,
  documnetAward,
  AwardReqBody,
  AwardResType,
  documnetWriteInfo,
  WriteInfoResType,
  WrtieInfoReqBody,
} from "../apis/document/patch";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { GetFileRes, getFile } from "@/apis/file";

export type ProfileType = "introduce" | "writer";
type ProfileArrayType = "project_list" | "award_list" | "certificate_list";

export type EachStateType =
  | AwardResType
  | CertificateResType
  | IntroduceResType
  | ProjectResType
  | WriteInfoResType;
export type StateArrayType = AwardReqBody | CertificateReqBody | ProjectReqBody;
export type StateType = WrtieInfoReqBody | IntroduceReqBody;

const dummy = "";

const typeFn = {
  writer: documnetWriteInfo,
  introduce: documnetIntroduce,
  project_list: documnetProject,
  award_list: documnetAward,
  certificate_list: documnetCertificate,
} as const;

export const onChange = (
  setState: (value: GetFileRes) => void,
  e: ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files) return;
  const file = new FormData();
  file.append("file", e.target.files[0]);
  getFile({ type: "DOCUMENT", file }).then(({ data }) => setState(data));
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

export const useProfileWrite = <T extends StateType>(
  initial: T,
  type: ProfileType
) => {
  const [state, setState] = useState<T>(initial);
  useQuery(["write"], () => myDetail(), {
    onSuccess: ({ data }) => {
      let temp = data[type];
      if (type === "writer") {
        // @ts-ignore
        temp = { ...temp, skill_set: temp.skill_set };
      }
      //@ts-ignore
      setState(temp);
    },
  });
  const { mutate } = useMutation({
    mutationFn: (body: StateType) => {
      const Fn = typeFn[type];
      // @ts-ignore
      return Fn(body);
    },
    onSuccess: () => {
      toast("임시저장하였습니다.", { autoClose: 1000, type: "success" });
    },
  });
  useEffect(() => () => mutate(state), []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const temp = handleChangeFn(state, e);
    setState(temp);
  };
  return { state, mutate, setState, handleChange };
};

export const useProfileWriteArray = <T extends StateArrayType>(
  initial: T,
  type: ProfileArrayType
) => {
  const [state, setState] = useState<T[]>([initial]);
  const { data } = useQuery(["write"], () => myDetail(), {
    onSuccess: ({ data }) => {
      let temp = data[type];
      //@ts-ignore
      setState(temp);
    },
  });
  const { mutate } = useMutation({
    mutationFn: (body: T[]) => {
      const Fn = typeFn[type];
      // @ts-ignore
      return Fn(body);
    },
    onSuccess: () => {
      toast("임시저장하였습니다.", { autoClose: 1000, type: "success" });
    },
  });
  useEffect(() => () => mutate(state), [data]);

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
    mutate,
    setState,
    handleChange,
    addItem,
    removeItem,
  };
};
