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
  disableId,
} from "../apis/document/patch";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  | WrtieInfoReqBody;
export type StateArrayType =
  | AwardReqBody
  | CertificateReqBody
  | ProjectReqBody
  | WrtieInfoReqBody
  | IntroduceReqBody;
export type StateType = WrtieInfoReqBody | IntroduceReqBody;

const typeFn: {
  [key in keyof Detail]: (body: any) => Promise<any>;
} = {
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
  getFile({ type: "DOCUMENT", file })
    .then(({ data }) => {
      setState(data);
    })
    .catch(() =>
      toast("1MB 이하의 파일을 선택해주세요.", {
        type: "error",
        autoClose: 1000,
      })
    );
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
  const [renderOnce, setRender] = useState<boolean>(false);
  const { data } = useQuery(["madeDetail"], () => myDetail(), {
    onSuccess: ({ data }) => {
      let temp = Object.assign(data[type]);
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
          url: data.writer.url ?? "",
        };
      }
      //@ts-ignore
      setState(temp);
      setRender(true);
    },
    onError: () => {
      toast("입력하지 않은 필드가 있습니다.", {
        autoClose: 1000,
        type: "error",
      });
    },
    enabled: !renderOnce,
  });

  const { mutate } = useMutation({
    mutationFn: (body: T): Promise<DetailType> => {
      const newBody = disableId(body);
      return typeFn[type](newBody);
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
      setState([initial[0], ...state]);
    }
    toast("아이템이 추가되었습니다!", { type: "success", autoClose: 1000 });
  };
  const moveItem = (index: number, move: number) => {
    if (Array.isArray(state)) {
      if (move && index > 0) {
        const copy = [...state];
        const temp = state[index];
        copy[index] = copy[index - 1];
        copy[index - 1] = temp;
        // @ts-ignore
        setState(copy);
      } else if (!move && index < state.length - 1) {
        const copy = [...state];
        const temp = state[index];
        copy[index] = copy[index + 1];
        copy[index + 1] = temp;
        // @ts-ignore
        setState(copy);
      }
    }
  };
  const removeItem = (index: number) => () => {
    if (Array.isArray(state)) {
      const copy = [...state];
      copy.splice(index, 1);
      // @ts-ignore
      setState(copy);
    }
    toast("아이템이 삭제되었습니다!", { type: "success", autoClose: 1000 });
  };

  const removeSkill =
    (index: number) => (value: { index: number; name: string }) => {
      if (Array.isArray(state)) {
        const copy = [...state];
        copy.splice(index, 1, removeSkillFn(state[index], value));
        // @ts-ignore
        setState(copy);
      } else setState(removeSkillFn(state, value));
    };

  const addSkill =
    (index: number) => (value: { keyword: string; name: string }) => {
      if (Array.isArray(state)) {
        const copy = [...state];
        copy.splice(index, 1, AddSkillFn(state[index], value));
        // @ts-ignore
        setState(copy);
      } else setState(AddSkillFn(state, value));
    };

  const onDateChange =
    (index: number) =>
    ({ value, name }: { value: number; name: string }) => {
      if (Array.isArray(state)) {
        const copy = [...state];
        copy.splice(index, 1, { ...state[index], [name]: value });
        // @ts-ignore
        setState(copy);
      }
    };

  const onDropdownSelect = (value: { keyword: string; name?: string }) => {
    // @ts-ignore
    const temp = onClickItem(state, value);
    setState(temp);
  };

  const toPreview = () => {
    mutate(state);
    return "preview";
  };

  const status = data?.data.document_status || "CREATED";
  const profileImg = data?.data.writer.profile_image_path;
  return {
    state,
    status,
    profileImg,
    mutate: () => mutate(state),
    setState,
    handleChange,
    addItem,
    moveItem,
    removeItem,
    toPreview,
    removeSkill,
    addSkill,
    onDateChange,
    onDropdownSelect,
    document_id: data?.data.document_id,
  };
};
