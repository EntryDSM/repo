import ReactOutSideClickHandler from "react-outside-click-handler";
import {Close, Teacher, User} from "@packages/ui/assets";
import {Logo} from "@packages/ui";
import {ReactNode} from "react";
import {useRouter} from "next/router";
import {getOAuth} from "@/apis/getOAuth";

interface Props {
  closeModal: () => void;
}

export const LoginBranchModal = ({ closeModal }: Props) => {
  const route = useRouter();
  const NavigateToTeacher = () => {
    route.push("https://teacher.dsm-repo.com/sign-in");
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
    getOAuth()
      .then(({data}) => {
        route.push(data.login_link.split(" ")[0]);
      });
  };

  return (
    <div
      className="fixed top-0 right-0 left-0 h-[100vh] flex items-center justify-center z-20"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      <ReactOutSideClickHandler onOutsideClick={closeModal}>
        <div className="w-[550px] h-[370px] relative rounded-lg bg-gray100 flex flex-col items-center justify-center gap-y-10 px-20">
          <div className="flex flex-col items-center gap-y-2.5">
            <Logo />
            <p className="text-body6">로그인 유형을 선택해 주세요</p>
          </div>
          <div className="flex flex-col gap-y-[15px] w-full">
            <NavigateButton
              onClick={NavigateToStudent}
              icon={<User size={30} />}
            >
              <p className="text-body5">학생 로그인하기</p>
            </NavigateButton>
            <NavigateButton
              onClick={NavigateToTeacher}
              icon={<Teacher size={30} />}
            >
              <p className="text-body5">선생님 로그인하기</p>
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
      className="w-full h-[50px] flex items-center bg-gray50 gap-x-5 cursor-pointer hover:[*>div]:first:bg-gray200"
    >
      <div className="w-[80px] h-full flex items-center justify-center bg-gray900 rounded-s-md ">
        {icon}
      </div>
      <div>{children}</div>
    </div>
  );
};
