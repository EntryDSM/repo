import { ImportLabel } from "@/components/ImportLabel";
import { Input } from "@packages/ui";
import { ResumeTitle } from "@/components/resume/Title";
import { useProfileWriteArray } from "@/hooks/useWriteProfile";
import { ResumeItem } from "@/components/resume/Item";
import { ResumeLayout } from "@/components/resume/Layout";

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
      <ResumeTitle value="자격증" onClick={addItem} />
      {state.map(({ name, issue_date, issuing_institution }, index) => {
        const handleChangeArray = handleChange(index);
        const removeItemArray = removeItem(index);
        return (
          <ResumeItem
            value={name}
            onChange={() => {}}
            placeholder="자격증 이름"
            onRemove={removeItemArray}
          >
            <ImportLabel label="자격증 명" important>
              <Input
                value={name}
                name="name"
                placeholder="자격증 이름을 입력해 주세요"
                onChange={handleChangeArray}
              />
            </ImportLabel>
            <ImportLabel label="발급 기관" important>
              <Input
                value={issuing_institution}
                name="issuing_institution"
                placeholder="발급 기관을 입력해 주세요"
                onChange={handleChangeArray}
              />
            </ImportLabel>
            <ImportLabel label="취득일" important>
              <Input
                value={issue_date}
                name="issue_date"
                placeholder="취득일을 입력해 주세요"
                onChange={handleChangeArray}
              />
            </ImportLabel>
          </ResumeItem>
        );
      })}
    </ResumeLayout>
  );
};

export default Certificate;
