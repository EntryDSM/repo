import { DetailType, StatusType, myDetail } from "@/apis/document/get/myDetail";
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
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { GetFileRes, getFile } from "@/apis/file";

interface Detail {
  introduce: IntroduceResType;
  writer: WriteInfoResType;
  project_list: ProjectResType;
  award_list: AwardResType;
  certificate_list: CertificateResType;
}
type ProfileTypeAll = keyof Detail;
export type ProfileType = "introduce" | "writer";

export type EachStateType =
  | AwardResType
  | CertificateResType
  | IntroduceResType
  | ProjectResType
  | WriteInfoResType;
export type StateArrayType =
  | AwardReqBody
  | CertificateReqBody
  | ProjectReqBody
  | WrtieInfoReqBody
  | IntroduceReqBody;
export type StateType = WrtieInfoReqBody | IntroduceReqBody;

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
  getFile({ type: "DOCUMENT", file }).then(({ data }) => {
    setState(data);
  });
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

export const useProfileWrite = <
  T extends DetailType[U],
  U extends ProfileTypeAll
>(
  initial: T,
  type: U
) => {
  const [state, setState] = useState<T>(initial);
  const [status, setStatus] = useState<StatusType>("CREATED");
  const [renderOnce, setRender] = useState<boolean>(false);
  useQuery(["madeDetail"], () => myDetail(), {
    onSuccess: ({ data }) => {
      let temp = data[type];
      if (type === "writer") {
        // @ts-ignore
        const [grade, class_num, ...number] = data.writer.student_number
          .toString()
          .split("");
        temp = {
          ...temp,
          skill_list: data.skill_list,
          grade,
          class_num,
          number: Number(number.join("")),
        };
      }
      const d = new Date(data.project_list[0].end_date);
      //@ts-ignore
      setState(temp);
      setStatus(data.document_status);
      setRender(true);
    },
    enabled: !renderOnce,
  });

  const { mutate } = useMutation({
    mutationFn: (body: T) => {
      const Fn = typeFn[type];
      // @ts-ignore
      return Fn(body);
    },
    onSuccess: () => {
      toast("임시저장하였습니다.", { autoClose: 1000, type: "success" });
    },
  });

  const handleChange =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (Array.isArray(state)) {
        const copy = [...state];
        copy.splice(index, 1, handleChangeFn(state[index], e));
        // @ts-ignore
        setState(copy);
        return copy;
      } else setState(handleChangeFn(state, e));
    };

  const addItem = () => {
    if (Array.isArray(state) && Array.isArray(initial)) {
      // @ts-ignore
      setState([...state, initial[0]]);
    }
  };
  const removeItem = (index: number) => () => {
    if (Array.isArray(state)) {
      const copy = [...state];
      copy.splice(index, 1);
      // @ts-ignore
      setState(copy);
    }
  };

  return {
    state,
    status,
    mutate: () => mutate(state),
    setState,
    handleChange,
    addItem,
    removeItem,
  };
};
