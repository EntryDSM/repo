import { ImportLabel } from "@/components/ImportLabel";
import { ResumeItem } from "@/components/ResumeItem";
import { ResumeLayout } from "@/components/ResumeLayout";
import { Input } from "../../../../../packages/ui";
import { ResumeTitle } from "@/components/ResumeTitle";

export const Certificate = () => {
  return (
    <ResumeLayout>
      <ResumeTitle value="자격증" onClick={() => {}} />
      <ResumeItem
        value="기모띠"
        onChange={() => {}}
        placeholder="자격증 이름"
        onRemove={() => {}}
      >
        <ImportLabel label="자격증 명" important>
          <Input value={""} placeholder="자격증 이름을 입력해 주세요" onChange={() => {}} />
        </ImportLabel>
        <ImportLabel label="발급 기관" important>
          <Input value={""} placeholder="발급 기관을 입력해 주세요" onChange={() => {}} />
        </ImportLabel>
        <ImportLabel label="취득일" important>
          <Input value={""} placeholder="취득일을 입력해 주세요" onChange={() => {}} />
        </ImportLabel>
      </ResumeItem>
    </ResumeLayout>
  );
};

export default Certificate;
