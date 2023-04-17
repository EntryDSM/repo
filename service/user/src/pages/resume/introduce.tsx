import { TextArea } from "@packages/ui";
import { ImportLabel } from "@/components/ImportLabel";
import { ResumeTitle, ResumeLayout } from "@/components/resume";
import { useProfileWrite } from "@/hooks/useWriteProfile";
import { FeedBack } from "@/components/resume/FeedBack";

const Introduce = () => {
  const { state, mutate, handleChange } = useProfileWrite(
    {
      heading: "",
      introduce: "",
      document_id: "",
      element_id: "",
      feedback: "",
    },
    "introduce"
  );
  return (
    <ResumeLayout mutate={mutate}>
      <ResumeTitle value="자기소개" />
      <FeedBack id={state} content={state.feedback} />
      <div className="px-[40px] flex flex-col gap-10">
        <ImportLabel label="한 줄 소개" important>
          <TextArea
            name="heading"
            value={state.heading}
            placeholder="한 줄 소개를 입력해주세요"
            onChange={handleChange}
          />
        </ImportLabel>
        <ImportLabel label="자기소개" important>
          <TextArea
            name="introduce"
            value={state.introduce}
            placeholder="자기소개를 입력해주세요"
            onChange={handleChange}
          />
        </ImportLabel>
      </div>
    </ResumeLayout>
  );
};

export default Introduce;
