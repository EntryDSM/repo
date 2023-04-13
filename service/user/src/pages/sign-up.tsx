import { Plus, RepoIcon } from "../../../../packages/ui/assets";

const SignUp = () => {
  return (
    <div className="flex h-[100vh]">
      <div
        className="flex-1 backdrop-blur-3xl"
        style={{ boxShadow: "inset 0px 4px 240px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="text-title1">
          <RepoIcon />
          REPO
        </div>
        <div className="flex justify-center items-center w-52 h-52 rounded-full">
          <Plus />
        </div>
        <p>프로필 추가</p>
      </div>
      <div className="w-[770px]">
        <div className="text-title1">회원가입</div>
      </div>
    </div>
  );
};

export default SignUp;
