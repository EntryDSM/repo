import Link from "next/link";
import { Button, Input } from "@packages/ui";
import { PostSignIn, postSignIn } from "@/apis/sign-in";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";

interface Form {
  account_id: string;
  password: string;
}

const SignIn = () => {
  const [form, setForm] = useState<Form>({
    account_id: "",
    password: "",
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
    onSuccess: () => {
      navigate.push("/");
    },
  });

  return (
    <div className="flex h-[100vh]">
      <div
        className="flex justify-center items-center flex-col flex-1 backdrop-blur-3xl"
        style={{ boxShadow: "inset 0px 4px 240px rgba(0, 0, 0, 0.25)" }}
      ></div>
      <div className="w-[770px] pl-40 pr-40">
        <Link href={"/"}>
          <button>뒤로가기</button>
        </Link>
        <div className="text-title1">선생님 로그인</div>
        <div className="flex gap-8 flex-col">
          <Input
            name="account_id"
            onChagne={onChange}
            label="이메일"
            placeholder="이메일을 입력해주세요"
            value={form.account_id}
          />
          <Input
            name="password"
            onChagne={onChange}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            value={form.password}
          />
        </div>
        <Button onClick={() => mutate(form)} radius="normal" kind="contained">
          로그인
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
