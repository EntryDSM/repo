import { Arrow } from "../../../../../packages/ui/assets";
import {
  DateValueType,
  stringToDate,
  useCalender,
} from "../../hooks/useCalender";
import { Button } from "../../../../../packages/ui";
import {data} from "autoprefixer";

interface PropsType {
  initialValue: string | number | undefined;
  closeDropdown: () => void;
  onSubmitAtInput: (value: string) => void;
}

const weekClassName = "w-10 h-10 m-1 flex items-center justify-center";

export const DayCalender = ({
  initialValue,
  closeDropdown,
  onSubmitAtInput,
}: PropsType) => {
  const {
    date,
    onSaveClickedDay,
    isCurrentDay,
    startDay,
    dayArray,
    weekArray,
    plusDate,
    minusDate,
  } = useCalender({ initialValue: initialValue || undefined });

  const setChangeAtInput = () => {
    onSubmitAtInput(date);
    closeDropdown();
  };

  const { year, month } = stringToDate(date);

  return (
    <>
      <div className="h-[64px] flex items-center px-4 justify-between ">
        <div className="flex items-center gap-[18px]">
          <Arrow direction="left" onClick={minusDate("month")} />
          {month}월
          <Arrow direction="right" onClick={plusDate("month")} />
        </div>
        <div className="flex items-center gap-[18px]">
          <Arrow direction="left" onClick={minusDate("year")} />
          {year}년
          <Arrow direction="right" onClick={plusDate("year")} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex w-auto h-[336px] flex-wrap">
          {weekArray.map((day) => (
            <div className={weekClassName} key={day}>
              {day}
            </div>
          ))}
          {Array(startDay)
            .fill(0)
            .map((_, idx) => (
              <div key={idx + "space"} className={weekClassName} />
            ))}
          {Array(dayArray)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx + "realShowDay"}
                className={`cursor-pointer rounded-full ${
                  isCurrentDay(idx + 1) && "bg-gray300 text-gray50"
                } hover:bg-gray200  hover:text-gray50 ${weekClassName}`}
                onClick={() => {
                  onSaveClickedDay(idx + 1, day => {
                    onSubmitAtInput(day);
                    closeDropdown();
                  });
                }}
              >
                {idx + 1}
              </div>
            ))}
        </div>
      </div>

      {/*<div className="flex h-14 items-center flex-row-reverse px-3">*/}
      {/*  <Button kind="text" radius="circle" onClick={setChangeAtInput}>*/}
      {/*    확인*/}
      {/*  </Button>*/}
      {/*  <Button kind="text" radius="circle" onClick={closeDropdown}>*/}
      {/*    취소*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </>
  );
};
