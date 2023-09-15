import { useState } from "react";

const returnLeapYear = (year: number) => (year % 4 === 0 ? 1 : 0);

const weekArray = ["일", "월", "화", "수", "목", "금", "토"];
const returnDayArray = (year: number) => [
  31,
  28 + returnLeapYear(year),
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];
const returnDomsDayArray = (year: number) => {
  const leapYear = returnLeapYear(year);
  return [3 + leapYear, 7 + leapYear, 7, 4, 9, 6, 11, 8, 5, 10, 7, 12];
};

const returnStartDay = (year: number, month: number) => {
  const anker = year >= 2000 ? 2 : 3;
  const domsDay = returnDomsDayArray(year);
  const getYearIndex01 = year % 100;
  const Index01Remain = getYearIndex01 % 12;
  const Index01Result = Math.floor(getYearIndex01 / 12);
  const divideRemain = Math.floor(Index01Remain / 4);
  const backCount = (domsDay[month] - 1) % 7;
  const weekAnker = (Index01Remain + Index01Result + divideRemain + anker) % 7;
  return (7 - backCount + weekAnker) % 7;
};

export interface DateValueType {
  year: number;
  month: number;
  day: number;
}
export const stringToDate = (str: string | number): DateValueType => {
  if(MillsecondToDate(str).includes("/")) {
    const [month, day, year] = MillsecondToDate(str).split("/").map(Number);
    return { year, month, day };
  }
  const [year, month, day] = MillsecondToDate(str).split(". ").map(Number);
  return { year, month, day };
};

export const dateToString = ({ year, month, day }: DateValueType) => {
  return [year, month, day].join(". ");
};

export const getInitDate = (includeDay?: boolean) => {
  const date = new Date();

  return [date.getFullYear(), date.getMonth(), date.getDate()].join(". ");
};

const MillsecondToDate = (str: string | number) => {
  const date = new Date(str);
  return typeof str === "number" ? date.toLocaleDateString() : str;
};

const onDateChange = (temp: DateValueType) => {
  const { month, year } = temp;
  if (month <= 0 && year > 1900) {
    temp.month = 12;
    temp.year--;
  } else if (month > 12 && year < 2099) {
    temp.month = 1;
    temp.year++;
  }
  return dateToString(temp);
};

type DateKeyType = keyof DateValueType;

interface PropsType {
  initialValue?: string | number;
}

export const useCalender = ({ initialValue = getInitDate() }: PropsType) => {
  const [date, setDate] = useState<string>(MillsecondToDate(initialValue));
  const [checkDate, setCheck] = useState<string>(
    MillsecondToDate(initialValue)
  );
  const objectDate = stringToDate(date);

  const plusMinus = (type: DateKeyType, act: "plus" | "minus") => {
    objectDate[type] += act === "plus" ? 1 : -1;
    setDate(onDateChange(objectDate));
  };

  const plusDate = (type: DateKeyType) => () => plusMinus(type, "plus");

  const minusDate = (type: DateKeyType) => () => plusMinus(type, "minus");

  const onSaveClickedDay = (day: number) => {
    const temp = stringToDate(date);
    setDate(dateToString({ ...temp, day: day }));
    setCheck(dateToString(temp));
  };

  const isCurrentDay = (currentDay: number) => {
    const check = stringToDate(checkDate);
    const { year, month, day } = stringToDate(date);
    return check.year === year && check.month === month && day === currentDay;
  };

  const { year, month } = stringToDate(date);
  return {
    date,
    onSaveClickedDay,
    isCurrentDay,
    startDay: returnStartDay(year, month - 1),
    dayArray: returnDayArray(year)[month - 1],
    weekArray,
    plusDate,
    minusDate,
  };
};
