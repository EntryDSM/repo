import Link from "next/link";
import { Button, Input, Logo } from "@packages/ui";
import { PostSignIn, postSignIn } from "@/apis/sign-in";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Arrow } from "@packages/ui/assets";

interface Form {
  account_id: string;
  password: string;
}

const SignIn = () => {
  const [form, setForm] = useState<Form>({
    account_id: "teacher123",
    password: "qwerty!1",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const navigate = useRouter();

  const { data, mutate } = useMutation({
    mutationFn: (body: PostSignIn) => {
      return postSignIn(body);
    },
    onSuccess: (res) => {
      toast("성공적으로 로그인하였습니다.", {
        autoClose: 1000,
        type: "success",
      });
      const { access_token, refresh_token } = res.data;
      localStorage.setItem("access_token", access_token || "");
      localStorage.setItem("refresh_token", refresh_token || "");
      navigate.push("/");
    },
    onError: () => {
      toast("아이디나 비밀번호를 확인해주세요.", {
        autoClose: 1000,
        type: "error",
      });
    },
  });

  return (
    <div className="flex h-[100vh]">
      <div
        className="flex justify-center items-center flex-col flex-1 backdrop-blur-3xl"
        style={{ boxShadow: "inset 0px 4px 240px rgba(0, 0, 0, 0.25)" }}
      >
        <Logo />
      </div>
      <div className="w-[770px] pl-40 pr-40 flex flex-col justify-center">
        <Link href={"/"}>
          <button className="flex">
            <Arrow direction="left" />
            back
          </button>
        </Link>
        <div className="text-title1 mt-14 mb-9">선생님 로그인</div>
        <div className="flex gap-8 flex-col">
          <Input
            name="account_id"
            onChange={onChange}
            label="이메일"
            placeholder="이메일을 입력해주세요"
            value={form.account_id}
          />
          <Input
            name="password"
            onChange={onChange}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            value={form.password}
          />
          <Button
            className="w-full mt-16"
            onClick={() => mutate(form)}
            radius="normal"
            kind="contained"
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
