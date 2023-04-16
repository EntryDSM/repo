import { DocumentMyRes } from "@/apis/document/my";
import { Button } from "@packages/ui";
import Image from "next/image";
import { ReactNode } from "react";

const statusList = ["작성", "제출됨", "공유됨"];
const statusIdx = {
  CREATED: 0,
  SUBMITTED: 1,
  SHARED: 2,
};

export const MyPage = ({
  profile_image_url,
  name,
  major_name,
  grade,
  class_num,
  number,
  is_exist,
  heading,
  introduce,
  email,
  status,
}: DocumentMyRes) => {
  return (
    <div className="max-w-[1120px] w-full m-auto mt-[200px] px-4">
      <div className="relative bg-gray50 w-[1120px] rounded-[15px] px-40 pt-[170px] pb-[100px] mb-[120px]">
        <div className="absolute -top-20 -ml-20 flex gap-x-[30px]">
          <div className="flex flex-col items-center gap-y-5">
            <Image
              width={160}
              height={160}
              src={profile_image_url}
              alt="profile"
              className="rounded-full"
            />
            <div className="w-[2px] h-10 bg-gray200 rounded" />
          </div>
          <div>
            <p className="text-title1 text-gray50">{name}</p>
            <p className="text-gray300 text-body4 mb-14">
              {major_name || "전공을 선택해 주세요"}
            </p>
            <p className="text-body5 mb-6">
              {grade}학년 {class_num}반 {number}번
            </p>
            <p className="text-body5">{email}</p>
          </div>
        </div>

        {is_exist ? (
          <>
            <div className="text-body3 mb-[44px]">{heading}</div>
            <div className="text-body6 text-gray400">{introduce}</div>
          </>
        ) : (
          <div className="text-body6 text-gray400">문서를 작성해주세요</div>
        )}
      </div>

      <p className="text-title1 mb-2.5">레주메</p>
      <p className="text-title4 mb-[47px]">Resumé</p>
      <div className="w-full h-[190px] bg-gray50 rounded-2xl pt-[60px] flex justify-center">
        <div className="flex">
          {statusList.map((statusItem, idx) => {
            const progress = statusIdx[status || "CREATED"];
            return (
              <Ball complete={idx <= progress} isFirstLine={idx === 0}>
                <div>{statusItem}</div>
              </Ball>
            );
          })}
          <Line width={80} />
          {/* <Ball>
            <div>작성</div>
          </Ball>
          <Line width={340} />
          <Ball>
            <div>제출됨</div>
          </Ball>
          <Line width={340} />
          <Ball>
            <div>공유됨</div>
          </Ball>
          <Line width={80} /> */}
        </div>
      </div>

      <div className="bg-gray50 rounded-2xl pl-12 pr-12 text-body3 mt-5 pt-14 pb-14 flex flex-col gap-10">
        <div>
          <span>피드백</span>
          <span className="text-gray300 ml-2">4</span>
        </div>
        <div className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12">
          <p>프로젝트 EXIT</p>
          <div className="text-body6">
            프로젝트에서 한 경험이나 그 프로젝트를 통해 배우거나 느낀점을 사례
            중심으로 자세하게 적어주면 좋을 것 같아요. 그냥 ~~했다 라는 식으로
            적고 끝내면 친구가 그 프로젝트를 통해 어떤 것을 얻었는지, 어떻게
            성장하게 되었는지를 알 수 없어서 그 부분을 더 추가해주세요.
          </div>
        </div>

        <div className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12">
          <p>프로젝트 EXIT</p>
          <div className="text-body6">
            프로젝트에서 한 경험이나 그 프로젝트를 통해 배우거나 느낀점을 사례
            중심으로 자세하게 적어주면 좋을 것 같아요. 그냥 ~~했다 라는 식으로
            적고 끝내면 친구가 그 프로젝트를 통해 어떤 것을 얻었는지, 어떻게
            성장하게 되었는지를 알 수 없어서 그 부분을 더 추가해주세요.
          </div>
        </div>

        <div className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12">
          <p>프로젝트 EXIT</p>
          <div className="text-body6">
            프로젝트에서 한 경험이나 그 프로젝트를 통해 배우거나 느낀점을 사례
            중심으로 자세하게 적어주면 좋을 것 같아요. 그냥 ~~했다 라는 식으로
            적고 끝내면 친구가 그 프로젝트를 통해 어떤 것을 얻었는지, 어떻게
            성장하게 되었는지를 알 수 없어서 그 부분을 더 추가해주세요.
          </div>
        </div>

        <div className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12">
          <p>프로젝트 EXIT</p>
          <div className="text-body6">
            프로젝트에서 한 경험이나 그 프로젝트를 통해 배우거나 느낀점을 사례
            중심으로 자세하게 적어주면 좋을 것 같아요. 그냥 ~~했다 라는 식으로
            적고 끝내면 친구가 그 프로젝트를 통해 어떤 것을 얻었는지, 어떻게
            성장하게 되었는지를 알 수 없어서 그 부분을 더 추가해주세요.
          </div>
        </div>
        <div className="flex justify-end gap-x-5 [&>button]:w-fit">
          <Button kind="contained" radius="circle">
            미리보기
          </Button>
          <Button kind="contained" radius="circle">
            내 이력서 관리하기
          </Button>
        </div>
      </div>
    </div>
  );
};

interface BallType {
  children: ReactNode;
  complete?: boolean;
  isFirstLine?: boolean;
}

interface LineType {
  width: number;
  complete?: boolean;
}

const Line = ({ complete, width }: LineType) => (
  <div
    className={`${complete ? "h-[3px]" : "h-[2px]"} mt-5 ${
      complete ? "bg-gray900" : "bg-gray300"
    }`}
    style={{ width: width }}
  ></div>
);

const Ball = ({ complete, children, isFirstLine }: BallType) => (
  <>
    <Line complete={complete} width={isFirstLine ? 80 : 340} />
    <div className="flex flex-col items-center gap-y-[15px]">
      <div
        className={`w-[30px] h-[30px] m-[5px] rounded-[100px] ${
          complete ? "bg-gray900" : "bg-gray300"
        }`}
      />
      {children}
    </div>
  </>
);
