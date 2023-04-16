import { Arrow, Plus } from "@packages/ui/assets";
import { Logo, Input, Button, Dropdown } from "@packages/ui";
import { useState } from "react";
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
  major_id: string;
}

const SignUp = () => {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "email@dsm.hs.kr",
    grade: 0,
    class_num: 0,
    number: 0,
    profile_image_path: "",
    major_id: "",
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

  const navigate = useRouter();

  const { data, mutate } = useMutation({
    mutationFn: (body: postSignUpBody) => {
      return postSignUp(body);
    },
    onSuccess: () => {
      toast("성공적으로 회원가입하였습니다.", {
        autoClose: 1000,
        type: "success",
      });
      navigate.push("/");
    },
  });

  const { data: major } = useQuery(["dwqdqw"], getMajor);

  const route = useRouter();
  oAuthLogin(route.query.code)
    .then((res) => {
      const { access_token, refresh_token } = res.data;

      if (access_token && refresh_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        navigate.push("/");
      }
    })
    .catch((err: AxiosError) => {
      //@ts-ignore
      if (err.response?.data && err.response.data.status === 400) {
        navigate.push("http://localhost:3001/");
      }
    });
  const [imgUrl, setImgUrl] = useState("");
  const { mutate: imgUpload } = useMutation({
    mutationFn: (req: FormData) => getFile({ type: "PROFILE", file: req }),
    onSuccess: (res) => {
      const { base_url, image_path } = res.data;
      setImgUrl(base_url + image_path);
      setForm({ ...form, profile_image_path: image_path });
    },
  });

  console.log(form.major_id);

  return (
    <div className="flex h-[100vh]">
      <div
        className="flex justify-center items-center flex-col flex-1 backdrop-blur-3xl"
        style={{ boxShadow: "inset 0px 4px 240px rgba(0, 0, 0, 0.25)" }}
      >
        <Logo />
        <input
          id="profile"
          onChange={(form) => {
            const formData = new FormData();
            formData.append("file", form.target.files[0]);
            imgUpload(formData);
          }}
          type="file"
          className="hidden"
        />
        <label
          htmlFor="profile"
          className="bg-gray200  flex justify-center items-center w-52 h-52 rounded-full mt-14 mb-5 cursor-pointer"
        >
          {imgUrl ? (
            <Image
              className="rounded-full object-cover"
              width={200}
              height={200}
              src={imgUrl}
              alt=""
            />
          ) : (
            <Plus />
          )}
        </label>
        <p className="text-body5">프로필 추가</p>
      </div>
      <div className="w-[770px] pl-40 pr-40 flex flex-col justify-center">
        <Link href={"/"} className="flex">
          <Arrow direction="left" />
          <button>뒤로가기</button>
        </Link>
        <div className="text-title1 mb-4">회원가입</div>
        <div className="flex gap-8 flex-col">
          <Input
            name="name"
            kind="text"
            onChange={onChange}
            label="이름"
            placeholder="이름을 입력해주세요"
            value={form.name}
          />
          <Input
            name="grade"
            kind="text"
            onChange={onChange}
            label="학년"
            placeholder="학년을 선택해주세요"
            value={form.grade}
          />
          <Input
            name="number"
            kind="text"
            onChange={onChange}
            label="반"
            placeholder="반을 선택해주세요"
            value={form.number}
          />
          <Input
            name="class_num"
            kind="text"
            onChange={onChange}
            label="번호"
            placeholder="번호를 입력해주세요"
            value={form.class_num}
          />
          {major && (
            <Dropdown
              className="mt-[29px]"
              placeholder="전공선택"
              //@ts-ignore
              lists={major.data.major_list}
              objectKey="name"
              name="id"
              onClick={({ keyword }) => {
                //@ts-ignore
                setForm({ ...form, major_id: keyword.id });
              }}
              value={
                major.data.major_list.find((m) => form.major_id === m.id)?.name
              }
            />
          )}
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
