import { myDetail } from "@/apis/document/get/myDetail";
import {
  documnetWriteInfo,
  WrtieInfoReqBody,
} from "../apis/document/patch/WriteInfo";
import { documnetAward, AwardReqBody } from "../apis/document/patch/Award";
import {
  documnetCertificate,
  CertificateReqBody,
} from "../apis/document/patch/Certificate";
import {
  documnetIntroduce,
  IntroduceReqBody,
} from "../apis/document/patch/Introduce";
import {
  documnetProject,
  ProjectReqBody,
} from "../apis/document/patch/Project";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

export type ProfileType = "introduce" | "writer";
type ProfileArrayType = "project_list" | "award_list" | "certificate_list";

type StateArrayType = AwardReqBody | CertificateReqBody | ProjectReqBody;
type StateType = WrtieInfoReqBody | IntroduceReqBody;

const dummy = "";

const typeFn = {
  writer: documnetWriteInfo,
  introduce: documnetIntroduce,
  project_list: documnetProject,
  award_list: documnetAward,
  certificate_list: documnetCertificate,
} as const;

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
  const save = useMutation({
    mutationFn: (body: StateType) => {
      const Fn = typeFn[type];
      // @ts-ignore
      return Fn(body);
    },
    onSuccess: () => {
      toast("임시저장하였습니다.", { autoClose: 1000, type: "success" });
    },
  });
  useEffect(() => () => save.mutate(state), []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const temp = handleChangeFn(state, e);
    setState(temp);
    
  };
  return { state, save, setState, handleChange };
};

export const useProfileWriteArray = <T extends StateArrayType>(
  initial: T,
  type: ProfileArrayType
) => {
  const [state, setState] = useState<T[]>([initial]);
  useQuery(["write"], () => myDetail(), {
    onSuccess: ({ data }) => {
      let temp = data[type];
      //@ts-ignore
      setState(temp);
    },
  });
  const save = useMutation({
    mutationFn: (body: T[]) => {
      const Fn = typeFn[type];
      // @ts-ignore
      return Fn(body);
    },
    onSuccess: () => {
      toast("임시저장하였습니다.", { autoClose: 1000, type: "success" });
    },
  });
  useEffect(() => () => save.mutate(state), []);

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
    save,
    setState,
    handleChange,
    addItem,
    removeItem,
  };
};
