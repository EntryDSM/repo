import ReactOutSideClickHandler from "react-outside-click-handler";
import { User, Teacher, Close } from "@packages/ui/assets";
import { Logo } from "@packages/ui";

interface Props {
  closeModal: () => void;
}

export const LoginBranchModal = ({ closeModal }: Props) => {
  return (
    <div
      className="flex items-center justify-center fixed top-0 right-0 left-0 h-[100vh]"
      style={{ background: "rgba(0, 0, 0, 0.1)" }}
    >
      <ReactOutSideClickHandler onOutsideClick={closeModal}>
        <div className="bg-white w-[550px] h-[330px] rounded-lg">
          <Logo />
          <Close />
          <User />
          <Teacher />
        </div>
      </ReactOutSideClickHandler>
    </div>
  );
};
