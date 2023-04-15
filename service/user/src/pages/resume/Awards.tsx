import { ImportLabel } from "@/components/ImportLabel";
import { ResumeItem } from "@/components/ResumeItem";
import { ResumeLayout } from "@/components/ResumeLayout";
import { ResumeTitle } from "@/components/ResumeTitle";
import { Input, TextArea } from "../../../../../packages/ui";

export const Awards = () => {
  return (
    <ResumeLayout>
      <ResumeTitle value="수상" onClick={() => {}} />
      <ResumeItem
        value="기모띠"
        onChange={() => {}}
        placeholder="상 이름"
        onRemove={() => {}}
      >
        <ImportLabel label="상 이름" important>
          <Input value={""} placeholder="" onChange={() => {}} />
        </ImportLabel>
        <ImportLabel label="수여 기관" important>
          <Input value={""} placeholder="" onChange={() => {}} />
        </ImportLabel>
        <ImportLabel label="기간" important>
          <Input value={""} placeholder="" onChange={() => {}} />
        </ImportLabel>
        <ImportLabel label="내용" important>
          <TextArea value="" placeholder="" name="" onChange={() => {}} />
        </ImportLabel>
      </ResumeItem>
    </ResumeLayout>
  );
};

export default Awards;
