import { Arrow, Plus } from "@packages/ui/assets";
import { Logo, Input, Button, Dropdown, pageRouteLinks } from "@packages/ui";
import { ChangeEvent, useEffect, useState } from "react";
import { oAuthLogin, postSignUp, postSignUpBody } from "@/apis/auth";
import { useMutation, useQuery } from "react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getMajor } from "@/apis/major";
import { getFile } from "@/apis/file";
import Image from "next/image";
import { AxiosError } from "axios";

interface Form {
  name: string;
  email: string;
  grade: number;
  class_num: number;
  number: number;
  profile_image_path: string;
  major_id: { id: string; name: string };
}

interface ImgFileType {
  file: File | null;
  preview: string;
}

const dropdownList = {
  grade: [1, 2, 3],
  class: [1, 2, 3, 4],
  number: Array(20)
    .fill(0)
    .map((_, idx) => idx + 1),
};

const SignUp = () => {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "email@dsm.hs.kr",
    grade: 0,
    class_num: 0,
    number: 0,
    profile_image_path: "",
    major_id: { id: "", name: "" },
  });
  const [img, setImg] = useState<ImgFileType>({
    file: null,
    preview: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (typeof form[name as keyof Form] == "number") {
      setForm({
        ...form,
        [name]: +value,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };
  const onDropdownChange = ({
    keyword,
    name,
  }: {
    keyword: number;
    name?: string;
  }) => {
    name && setForm({ ...form, [name]: keyword });
  };

  const { push, back } = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (body: postSignUpBody) => {
      const formData = new FormData();
      console.log(img);
      if (img.file) formData.append("file", img.file);
      const { data } = await getFile({ type: "PROFILE", file: formData });
      return postSignUp({ ...body, profile_image_path: data.image_path });
    },
    onSuccess: () => {
      toast("성공적으로 회원가입하였습니다.", {
        autoClose: 1000,
        type: "success",
      });
      push("/");
    },
    onError: () => {
      toast("에러 발생", { type: "error" });
    },
  });

  const { data: major } = useQuery(["dwqdqw"], getMajor);

  const route = useRouter();
  // @ts-ignore
  useQuery(["oauthlogIn"], () => oAuthLogin(route.query), {
    onSuccess: ({ data }) => {
      const { access_token, refresh_token } = data;
      if (access_token && refresh_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        push(pageRouteLinks.user);
      }
    },
    onError: ({ response }) => {
      const data = response?.data;

      if (!data) return;

      switch (data.status) {
        case 422:
          setForm({ ...form, email: data.message });
          return;
        case 403:
        case 400:
          push(pageRouteLinks.main);
          toast("학교 이메일이 아닙니다.", { type: "error" });
          return;
      }
    },
    enabled: !!route.query.code,
    retry: 0,
  });
  const { mutate: imgUpload } = useMutation({
    mutationFn: (req: FormData) => getFile({ type: "PROFILE", file: req }),
  });

  const onUploadProfile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (typeof base64 !== "string") return;
      setImg({ file, preview: base64 });
    };
    const formData = new FormData();
    formData.append("file", file);
    imgUpload(formData);
  };

  const majorData = major?.data.major_list;

  return (
    <div className="flex h-[100vh]">
      <div
        className="flex justify-center items-center flex-col flex-1 backdrop-blur-3xl"
        style={{ boxShadow: "inset 0px 4px 240px rgba(0, 0, 0, 0.25)" }}
      >
        <Logo />
        <input
          id="profile"
          onChange={onUploadProfile}
          type="file"
          className="hidden"
        />
        <label
          htmlFor="profile"
          className="bg-gray200  flex justify-center items-center w-52 h-52 rounded-full mt-14 mb-5 cursor-pointer"
        >
          {img.preview ? (
            <Image
              className="rounded-full object-cover w-[200px] h-[200px]"
              width={200}
              height={200}
              src={img.preview}
              alt=""
            />
          ) : (
            <Plus />
          )}
        </label>
        <p className="text-body5">프로필 추가</p>
      </div>
      <div className="w-[770px] pl-40 pr-40 flex flex-col justify-center">
        <button onClick={back} className="flex items-center">
          <Arrow direction="left" />
          뒤로가기
        </button>
        <div className="text-title1 mb-4">회원가입</div>
        <div className="flex gap-8 flex-col">
          <Dropdown
            name="grade"
            kind="outline"
            onClick={onDropdownChange}
            roleName="학년"
            label="학년"
            placeholder="학년을 선택해주세요"
            lists={dropdownList.grade}
            value={form.grade}
          />
          <Dropdown
            name="class_num"
            kind="outline"
            onClick={onDropdownChange}
            label="반"
            roleName="반"
            placeholder="반을 선택해주세요"
            lists={dropdownList.class}
            value={form.class_num}
          />
          <Dropdown
            name="number"
            kind="outline"
            onClick={onDropdownChange}
            label="번호"
            roleName="번"
            placeholder="번호를 입력해주세요"
            value={form.number}
            lists={dropdownList.number}
          />
          {Array.isArray(major?.data.major_list) && (
            <Dropdown
              placeholder="전공선택"
              label="전공"
              lists={majorData || []}
              objectKey="name"
              name="major_id"
              onClick={({ keyword, name }) =>
                name && setForm({ ...form, [name]: keyword })
              }
              value={form.major_id}
            />
          )}
          <Input
            name="name"
            kind="text"
            onChange={onChange}
            label="이름"
            placeholder="이름을 입력해주세요"
            value={form.name}
          />
        </div>
        <Button
          className="w-full mt-10"
          onClick={() => mutate(form)}
          radius="normal"
          kind="contained"
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
