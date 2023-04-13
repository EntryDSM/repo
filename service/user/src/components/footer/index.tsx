import { Github, FaceBook } from "@packages/ui/assets";

export const Footer = () => {
  return (
    <footer className="h-72 bg-gray100">
      <div className="pl-[300px] pr-[300px]">
        <div className="text-title1">REPO</div>
        <div className="text-body6">©2023 Entry</div>
        <div className="text-body7">
          주소 : 대전광역시 유성구 가정북로 76 (장동 23-9)
          <br />
          교무실 : 042-866-8822 | Fax : 042-867-9900 | 행정실 : 042-866-8885 |
          Fax : 042-863-4308
        </div>
        <div className="text-body5">Entrepreneur</div>
        <div className="text-body6">개인정보처리방침 | 이용약관</div>
        <Github />
        <FaceBook />
      </div>
    </footer>
  );
};
