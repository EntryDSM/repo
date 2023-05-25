import { ImportLabel } from "@/components/ImportLabel";
import { Input, TextArea } from "@packages/ui";
import { useProfileWrite } from "@/hooks/useWriteProfile";
import { useMutation } from "react-query";
import { ResumeTitle, ResumeItem, ResumeLayout } from "@/components/resume";
import { AwardReqBody, documnetAward } from "@/apis/document/patch/Award";
import { FeedBack } from "@/components/resume/FeedBack";
import { DateInput } from "@/components/date";

export const Awards = () => {
  const {
    state,
    toPreview,
    status,
    profileImg,
    setState,
    mutate,
    handleChange,
    addItem,
    removeItem,
    document_id,
  } = useProfileWrite(
    [
      {
        name: "",
        awarding_institution: "",
        date: "",
        description: "",
        element_id: null,
        feedback: "",
      },
    ],
    "award_list"
  );

  return (
    <ResumeLayout
      mutate={mutate}
      status={status}
      profileImg={profileImg}
      toPreview={toPreview}
    >
      <ResumeTitle value="수상" onClick={addItem} />
      {state.map((item, index) => {
        const {
          name,
          awarding_institution,
          date,
          description,
          feedback,
          element_id,
        } = item;
        const handleChangeArray = handleChange(index);
        const removeItemArray = removeItem(index);
        const onDateChange = ({
          value,
          name,
        }: {
          value: number;
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
            placeholder="상 이름"
            onRemove={removeItemArray}
            key={element_id}
          >
            <FeedBack
              document_id={document_id}
              element_id={element_id}
              content={feedback}
            />
            <ImportLabel label="상 이름" important>
              <Input
                value={name}
                name="name"
                placeholder="수상한 상의 이름을 입력해주세요"
                onChange={handleChangeArray}
              />
            </ImportLabel>
            <ImportLabel label="수여 기관" important>
              <Input
                value={awarding_institution}
                name="awarding_institution"
                placeholder="상을 수여한 기관을 입력해주세요"
                onChange={handleChangeArray}
              />
            </ImportLabel>
            <ImportLabel label="기간" important>
              <DateInput
                value={date}
                name="date"
                onSubmitAtInput={onDateChange}
              />
            </ImportLabel>
            <ImportLabel label="내용" important>
              <TextArea
                value={description || ""}
                placeholder="내용을 입력해 주세요"
                name="description"
                onChange={handleChangeArray}
              />
            </ImportLabel>
          </ResumeItem>
        );
      })}
    </ResumeLayout>
  );
};

export default Awards;
