import { Plus } from "@packages/ui/assets";
import { Logo, Input, Button } from "@packages/ui";
import { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "email@dsm.hs.kr",
    grade: 0,
    class_num: 0,
    number: 0,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
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
      <div className="w-[770px]">
        <div className="text-title1">회원가입</div>
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
        <Button radius="normal" kind="contained">
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
