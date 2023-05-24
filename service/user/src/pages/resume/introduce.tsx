import { TextArea } from "@packages/ui";
import { ImportLabel } from "@/components/ImportLabel";
import { ResumeTitle, ResumeLayout } from "@/components/resume";
import { useProfileWrite } from "@/hooks/useWriteProfile";
import { FeedBack } from "@/components/resume/FeedBack";

const Introduce = () => {
  const {
    state,
    toPreview,
    profileImg,
    status,
    mutate,
    handleChange,
    document_id,
  } = useProfileWrite(
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
    <ResumeLayout
      mutate={mutate}
      profileImg={profileImg}
      status={status}
      toPreview={toPreview}
    >
      <ResumeTitle value="자기소개" />
      <FeedBack
        document_id={document_id}
        element_id={state.element_id}
        content={state.feedback}
      />
      <div className="px-[40px] flex flex-col gap-10">
        <ImportLabel label="한 줄 소개" important>
          <TextArea
            name="heading"
            value={state.heading}
            placeholder="한 줄 소개를 입력해주세요"
            onChange={handleChange(0)}
            maxLine={2}
            limit={70}
          />
        </ImportLabel>
        <ImportLabel label="자기소개" important>
          <TextArea
            name="introduce"
            value={state.introduce}
            placeholder="자기소개를 입력해주세요"
            onChange={handleChange(0)}
            maxLine={6}
          />
        </ImportLabel>
      </div>
    </ResumeLayout>
  );
};

export default Introduce;
