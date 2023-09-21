const zeroNumber = (value: number) => `${value < 10 ? "0" : ""}${value}`;

export const millisecondToDate = (str: number | string) => {
  const date = new Date(str || 0);
  return `${date.getFullYear()}.${zeroNumber(date.getMonth() + 1)}.${zeroNumber(
    date.getDate()
  )}`;
};
