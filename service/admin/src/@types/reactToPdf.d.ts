import { ReactNode } from "react";

interface PdfType {
  children: ReactNode;
}

declare module "react-to-pdf" {
  export function Pdf(): ReactNode {}
}
