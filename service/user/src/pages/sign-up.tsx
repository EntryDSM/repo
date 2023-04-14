import { Plus } from "@packages/ui/assets";
import { Logo, Input, Button } from "@packages/ui";
import { useState } from "react";
import { postSignUp } from "@/apis/sign-up";
import { useMutation } from "react-query";

interface Form {
  name: string;
  email: string;
  grade: number;
  class_num: number;
  number: number;
}

const SignUp = () => {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "email@dsm.hs.kr",
    grade: 0,
    class_num: 0,
    number: 0,
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

  const submitSignUp = async () => {
    const { data, mutate } = useMutation(postSignUp);
    try {
      const a = await postSignUp(form);
      console.log(a);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-[100vh]">
      <div
        className="flex justify-center items-center flex-col flex-1 backdrop-blur-3xl"
        style={{ boxShadow: "inset 0px 4px 240px rgba(0, 0, 0, 0.25)" }}
      >
        <Logo />
        <div className="bg-gray100 flex justify-center items-center w-52 h-52 rounded-full mt-14 mb-5">
          <Plus />
        </div>
        <p className="text-body5">프로필 추가</p>
      </div>
      <div className="w-[770px] pl-40 pr-40">
        <div className="text-title1">회원가입</div>
        <div className="flex gap-8 flex-col">
          <Input
            name="name"
            onChagne={onChange}
            label="이름"
            placeholder="이름을 입력해주세요"
            value={form.name}
          />
          <Input
            name="grade"
            onChagne={onChange}
            label="학년"
            placeholder="학년을 선택해주세요"
            value={form.grade}
          />
          <Input
            name="number"
            onChagne={onChange}
            label="반"
            placeholder="반을 선택해주세요"
            value={form.number}
          />
          <Input
            name="class_num"
            onChagne={onChange}
            label="번호"
            placeholder="번호를 입력해주세요"
            value={form.class_num}
          />
        </div>
        <Button onClick={submitSignUp} radius="normal" kind="contained">
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
