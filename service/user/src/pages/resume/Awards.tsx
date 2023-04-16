import { ImportLabel } from "@/components/ImportLabel";
import { ResumeItem } from "@/components/ResumeItem";
import { ResumeLayout } from "@/components/ResumeLayout";
import { ResumeTitle } from "@/components/ResumeTitle";
import { Input, TextArea } from "../../../../../packages/ui";
import { useProfileWriteArray } from "@/hook/useWriteProfile";
import { useMutation } from "react-query";
import { AwardReqBody, documnetAward } from "@/apis/document/award";
import { toast } from "react-toastify";

export const Awards = () => {
  const { state, handleChange, addItem, removeItem } = useProfileWriteArray(
    {
      name: "",
      awarding_institution: "",
      date: new Date(),
      description: "",
    },
    "award_list"
  );

  const { mutate } = useMutation({
    mutationFn: (body: AwardReqBody[]) => documnetAward(body),
    onSuccess: () => {
      toast("임시저장하였습니다.", { autoClose: 1000, type: "success" });
    },
  });

  return (
    <ResumeLayout mutate={mutate} state={state}>
      <ResumeTitle value="수상" onClick={() => {}} />
      {state.map(({ name, awarding_institution, date, description }, index) => {
        const handleChangeArray = handleChange(index);
        const removeItemArray = removeItem(index);
        return (
          <ResumeItem
            value={name}
            onChange={() => {}}
            placeholder="상 이름"
            onRemove={removeItemArray}
          >
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
              <Input
                value={date}
                name="date"
                placeholder="기간을 입력해 주세요"
                onChange={handleChangeArray}
              />
            </ImportLabel>
            <ImportLabel label="내용" important>
              <TextArea
                value={description}
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
