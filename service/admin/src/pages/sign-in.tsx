import Link from "next/link";
import { Button, Input, Logo } from "@packages/ui";
import { PostSignIn, postSignIn } from "@/apis/sign-in";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Arrow } from "@packages/ui/assets";

interface Form {
  account_id: string;
  password: string;
}

const saveEmailKey = "saveEmail";
const emailDataKey = "emailData";

const getSaveEmail = () => {
  const isSaveEmail = !!localStorage.getItem(saveEmailKey);
  const email = localStorage.getItem(emailDataKey) || "";
  return { isSaveEmail, email };
};

const setSaveEmail = (isSave: boolean, email?: string) => {
  localStorage.setItem(saveEmailKey, isSave ? "1" : "");
  email && localStorage.setItem(emailDataKey, email);
};

const SignIn = () => {
  const [form, setForm] = useState<Form>({
    account_id: "",
    password: "",
  });
  const [saveEmail, setSave] = useState<boolean>(false);

  useEffect(() => {
    const { isSaveEmail, email } = getSaveEmail();
    setSave(isSaveEmail);
    if (isSaveEmail) setForm({ ...form, account_id: email });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    if (saveEmail) {
      setSave(true);
      setSaveEmail(saveEmail, value);
    }
  };

  const navigate = useRouter();

  const { data, mutate } = useMutation({
    mutationFn: (body: PostSignIn) => {
      return postSignIn(body);
    },
    onSuccess: (res) => {
      const { access_token, refresh_token } = res.data;
      localStorage.setItem("access_token", access_token || "");
      localStorage.setItem("refresh_token", refresh_token || "");
      toast("성공적으로 로그인하였습니다.", {
        autoClose: 1000,
        type: "success",
      });
      navigate.push("/");
    },
    onError: () => {
      toast("아이디나 비밀번호를 확인해주세요.", {
        autoClose: 1000,
        type: "error",
      });
    },
  });

  const invertEmailSave = () => {
    setSave(!saveEmail);
    setSaveEmail(!saveEmail);
  };

  return (
    <div className="flex h-[100vh] bg-gray50">
      <div
        className="flex justify-center items-center flex-col flex-1 backdrop-blur-3xl"
        style={{ boxShadow: "inset 0px 4px 240px rgba(0, 0, 0, 0.25)" }}
      >
        <Logo />
      </div>
      <div className="w-[770px] pl-40 pr-40 flex flex-col justify-center">
        <div>
          <button
            onClick={() => navigate.back()}
            className="flex text-body5 text-gray400 [&_path]:fill-gray400"
          >
            <Arrow direction="left" />
            back
          </button>
          <p className="text-title1  mb-9">선생님 로그인</p>
        </div>

        <div className="flex gap-8 flex-col">
          <Input
            kind="text"
            name="account_id"
            onChange={onChange}
            label="이메일"
            placeholder="이메일을 입력해주세요"
            value={form.account_id}
            className="bg-gray50"
          />
          <Input
            kind="password"
            name="password"
            onChange={onChange}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            value={form.password}
            className="bg-gray50"
          />
          <div onClick={invertEmailSave} className="flex gap-3">
            <div
              className={`rounded-sm border-2 border-gray400 w-6 h-6 ${
                saveEmail && "bg-blue200 border-none"
              }`}
            ></div>
            자동 로그인
          </div>
          <Button
            className="w-full mt-16 text-body3"
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
