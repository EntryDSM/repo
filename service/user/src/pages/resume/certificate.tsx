import { ImportLabel } from "@/components/ImportLabel";
import { Input } from "@packages/ui";
import { ResumeTitle, ResumeItem, ResumeLayout } from "@/components/resume";
import { useProfileWrite } from "@/hooks/useWriteProfile";
import { FeedBack } from "@/components/resume/FeedBack";
import { DateInput } from "@/components/date";

export const Certificate = () => {
  const { state, status, setState, mutate, handleChange, addItem, removeItem } =
  useProfileWrite(
      [
        {
          name: "",
          issuing_institution: "",
          issue_date: "",
          document_id: "",
          element_id: "",
          feedback: "",
        },
      ],
      "certificate_list"
    );
  return (
    <ResumeLayout mutate={mutate} status={status}>
      <ResumeTitle value="자격증" onClick={addItem} />
      {state.map((item, index) => {
        const { name, issue_date, issuing_institution, feedback } = item;
        const handleChangeArray = handleChange(index);
        const removeItemArray = removeItem(index);
        const onDateChange = ({
          value,
          name,
        }: {
          value: string;
          name: string;
        }) => {
          const copy = [...state];
          copy.splice(index, 1, { ...item, [name]: value });
          setState(copy);
        };
        return (
          <ResumeItem
            value={name}
            onChange={() => {}}
            placeholder="자격증 이름"
            onRemove={removeItemArray}
          >
            <FeedBack id={item} content={feedback} />
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
              <DateInput
                value={issue_date}
                name="issue_date"
                placeholder="취득일을 입력해 주세요"
                onSubmitAtInput={onDateChange}
              />
            </ImportLabel>
          </ResumeItem>
        );
      })}
    </ResumeLayout>
  );
};

export default Certificate;
