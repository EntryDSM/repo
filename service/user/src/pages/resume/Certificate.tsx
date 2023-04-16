import { ImportLabel } from "@/components/ImportLabel";
import { ResumeItem } from "@/components/ResumeItem";
import { ResumeLayout } from "@/components/ResumeLayout";
import { Input } from "../../../../../packages/ui";
import { ResumeTitle } from "@/components/ResumeTitle";
import { useProfileWriteArray } from "../../hook/useWriteProfile";

export const Certificate = () => {
  const { state, handleChange, addItem, removeItem } = useProfileWriteArray(
    {
      name: "",
      issuing_institution: "",
      issue_date: "",
    },
    "certificate_list"
  );
  return (
    <ResumeLayout>
      <ResumeTitle value="자격증" onClick={() => {}} />
      {state.map(({ name, issue_date, issuing_institution }, index) => (
        <ResumeItem
          value={name}
          onChange={() => {}}
          placeholder="자격증 이름"
          onRemove={() => {}}
        >
          <ImportLabel label="자격증 명" important>
            <Input
              value={name}
              placeholder="자격증 이름을 입력해 주세요"
              onChange={() => {}}
            />
          </ImportLabel>
          <ImportLabel label="발급 기관" important>
            <Input
              value={issue_date}
              placeholder="발급 기관을 입력해 주세요"
              onChange={() => {}}
            />
          </ImportLabel>
          <ImportLabel label="취득일" important>
            <Input
              value={""}
              placeholder="취득일을 입력해 주세요"
              onChange={() => {}}
            />
          </ImportLabel>
        </ResumeItem>
      ))}
    </ResumeLayout>
  );
};

export default Certificate;
