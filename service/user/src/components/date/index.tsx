import OutsideClickHandler from "react-outside-click-handler";
import { stringToDate } from "../../hooks/useCalender";
import { useInversion } from "../../../../../packages/hooks/useInversion";
import { DayCalender } from "./DayCalender";

interface PropsType {
  label?: string;
  name: string;
  value: string | number | undefined;
  placeholder?: string;
  onSubmitAtInput: (value: { value: number; name: string }) => void;
}

export const DateInput = ({
  label,
  onSubmitAtInput,
  value,
  name,
  placeholder = "날짜를 선택해 주세요",
}: PropsType) => {
  const {
    state: dropdown,
    correct: openDropdown,
    inCorrect: closeDropdown,
  } = useInversion();
  const CalenderDateValue = () => {
    if (value) {
      const { year, month, day } = stringToDate(+value);
      const date = [year + "년", month + "월", day + "일"];

      return date.join(" ");
    }
  };

  const submitOnInput = (value: string) => {
    const date = new Date(value);
    onSubmitAtInput({ value: date.getTime(), name });
  };

  return (
    <OutsideClickHandler display="flex" onOutsideClick={closeDropdown}>
      <div className="relative w-full">
        <p className="text-body2">{label}</p>
        <div
          className="cursor-pointer relative bg-gray100 rounded-sm  w-full h-[46px] flex items-center pr-[8px] pl-[16px] "
          onClick={openDropdown}
        >
          <input
            className="pointer-events-none w-full cursor-pointer text-body6 bg-transparent outline-none caret-transparent"
            value={CalenderDateValue() || ""}
            placeholder={placeholder}
            readOnly
          />
        </div>
        {dropdown && (
          <div className="w-[345px] rounded-[4px] border-[1px] bg-gray50 absolute z-10 top-[60px] right-0">
            <DayCalender
              initialValue={value}
              closeDropdown={closeDropdown}
              onSubmitAtInput={submitOnInput}
            />
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};
