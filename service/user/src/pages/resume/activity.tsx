import { ImportLabel } from "@/components/ImportLabel";
import { Input, TextArea } from "@packages/ui";
import { useProfileWrite } from "@/hooks/useWriteProfile";
import { ResumeTitle, ResumeItem, ResumeLayout } from "@/components/resume";
import { FeedBack } from "@/components/resume/FeedBack";
import { DateInput } from "@/components/date";
import { Check } from "@packages/ui/assets";

export const Activity = () => {
  const {
    state,
    toPreview,
    status,
    profileImg,
    setState,
    mutate,
    handleChange,
    addItem,
    moveItem,
    initDate,
    removeItem,
    document_id,
  } = useProfileWrite(
    [
      {
        name: "",
        date: "",
        end_date: "",
        is_period: false,
        description: "",
        element_id: null,
        feedback: "",
      },
    ],
    "activity_list"
  );

  return (
    <ResumeLayout
      mutate={mutate}
      status={status}
      profileImg={profileImg}
      toPreview={toPreview}
    >
      <ResumeTitle value="활동" onClick={addItem} />
      {state.map((item, index) => {
        const {
          name,
          date,
          end_date,
          is_period,
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
            placeholder="활동 이름"
            onRemove={removeItemArray}
            onMove={moveItem}
            key={element_id}
            index={index}
          >
            <FeedBack
              document_id={document_id}
              element_id={element_id}
              content={feedback}
            />
            <ImportLabel label="활동 이름" important>
              <Input
                value={name}
                name="name"
                placeholder="활동 이름을 입력해주세요"
                onChange={handleChangeArray}
              />
            </ImportLabel>
            <ImportLabel label="날짜" important>
              {!is_period ? (
                <DateInput
                  value={date}
                  name="date"
                  onSubmitAtInput={onDateChange}
                />
              ) : (
                <div className="flex items-center justify-between gap-[14px] w-full">
                  <DateInput
                    value={date}
                    name="date"
                    placeholder="시작일"
                    onSubmitAtInput={onDateChange}
                  />
                  ~
                  <DateInput
                    value={end_date}
                    name="end_date"
                    placeholder="종료일"
                    onSubmitAtInput={onDateChange}
                  />
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <div
                  className={`transition-all bg-gray50 flex justify-center items-center rounded-sm border-2 border-gray400 w-6 h-6 cursor-pointer hover:bg-gray100 ${
                    is_period && "bg-gray900 border-gray900 hover:bg-gray600"
                  }`}
                  onClick={() => initDate(index)}
                >
                  {is_period && <Check size={24} color="white" />}
                </div>
                기간
              </div>
            </ImportLabel>
            <ImportLabel label="내용">
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

export default Activity;
