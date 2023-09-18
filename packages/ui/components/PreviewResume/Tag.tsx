import React from "react";

interface Props {
  technology: string;
  className?: string;
}

export const Tag = ({ technology, className }: Props) => (
  <div
    className={`${className} rounded-md pl-2 pr-2 pt-0.5 pb-0.5 text-body7 flex items-center justify-center whitespace-nowrap`}
  >
    {technology}
  </div>
);
