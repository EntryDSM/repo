import ReactOutSideClickHandler from "react-outside-click-handler";
import { User, Teacher, Close } from "@packages/ui/assets";
import { Logo } from "@packages/ui";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getOAuth } from "@/apis/getOAuth";
import GoogleLogin from "react-google-login";

interface Props {
  closeModal: () => void;
}

export const LoginBranchModal = ({ closeModal }: Props) => {
  const route = useRouter();
  const NavigateToTeacher = () => {
    route.push("/");
  };
  // const { data, mutate } = useMutation({
  //   mutationFn: (body: postSignUpBody) => {
  //     return getOAuth(body);
  //   },
  //   onSuccess: () => {
  //     navigate.push("/");
  //   },
  // });

  const NavigateToStudent = () => {
    getOAuth().then(({ data }) => {
      route.push(data.login_link.split(" ")[0]);
    });
  };

  return (
    <div
      className="fixed top-0 right-0 left-0 h-[100vh] flex items-center justify-center "
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      <ReactOutSideClickHandler onOutsideClick={closeModal}>
        <div className="w-[550px] h-[370px] relative rounded-lg bg-gray-100 flex flex-col items-center justify-center gap-y-10 px-20">
          <div className="flex flex-col items-center gap-y-2.5">
            <Logo />
            <div className="body6">로그인 유형을 선택해 주세요</div>
          </div>
          <div className="flex flex-col gap-y-[15px] w-full">
            <NavigateButton
              onClick={NavigateToStudent}
              icon={<User size={30} />}
            >
              학생 로그인하기
            </NavigateButton>
            <NavigateButton
              onClick={NavigateToTeacher}
              icon={<Teacher size={30} />}
            >
              선생님 로그인하기
            </NavigateButton>
          </div>
          <div
            onClick={closeModal}
            className="absolute top-[30px] right-[30px] cursor-pointer"
          >
            <Close size={24} />
          </div>
        </div>
      </ReactOutSideClickHandler>
    </div>
  );
};

interface NaviType {
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
}

const NavigateButton = ({ icon, children, onClick }: NaviType) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-[50px] flex items-center bg-gray-50 gap-x-5 cursor-pointer hover:[*>div]:first:bg-gray-200"
    >
      <div className="w-[80px] h-full flex items-center justify-center bg-gray-900 rounded-s-md ">
        {icon}
      </div>
      <div className="text-body5">{children}</div>
    </div>
  );
};
