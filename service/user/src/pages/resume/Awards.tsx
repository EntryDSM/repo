import { ImportLabel } from "@/components/ImportLabel";
import { ResumeItem } from "@/components/ResumeItem";
import { ResumeLayout } from "@/components/ResumeLayout";
import { ResumeTitle } from "@/components/ResumeTitle";
import { Input, TextArea } from "../../../../../packages/ui";
import { useProfileWriteArray } from "@/hook/useWriteProfile";

export const Awards = () => {
  const { state, handleChange, addItem, removeItem } = useProfileWriteArray(
    {
      name: "",
      awarding_institution: "",
      date: "",
      description: "",
    },
    "award_list"
  );
  return (
    <ResumeLayout>
      <ResumeTitle value="수상" onClick={() => {}} />
      {state.map(({ name, awarding_institution, date, description }, index) => (
        <ResumeItem
          value="기모띠"
          onChange={() => {}}
          placeholder="상 이름"
          onRemove={removeItem}
        >
          <ImportLabel label="상 이름" important>
            <Input
              value={""}
              placeholder="수상한 상의 이름을 입력해주세요"
              onChange={() => {}}
            />
          </ImportLabel>
          <ImportLabel label="수여 기관" important>
            <Input
              value={""}
              placeholder="상을 수여한 기관을 입력해주세요"
              onChange={() => {}}
            />
          </ImportLabel>
          <ImportLabel label="기간" important>
            <Input
              value={""}
              placeholder="기간을 입력해 주세요"
              onChange={() => {}}
            />
          </ImportLabel>
          <ImportLabel label="내용" important>
            <TextArea
              value=""
              placeholder=""
              name="내용을 입력해 주세요"
              onChange={() => {}}
            />
          </ImportLabel>
        </ResumeItem>
      ))}
    </ResumeLayout>
  );
};

export default Awards;
