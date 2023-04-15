import React from "react";

interface Props {
  technology: string;
  className?: string;
}

export const Tag = ({ technology, className }: Props) => (
  <div className={`${className} rounded-md pl-2 pr-2 pt-1 pb-1 text-body7`}>
    {technology}
  </div>
);
