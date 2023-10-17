import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MutableRefObject } from "react";

export const convert2PdfAll = async (
  { current }: MutableRefObject<HTMLElement | null>,
  fileName: string
) => {
  if (!current) return;

  console.log("sdfs")
  const response = await fetch(`/api/pdf?grade=2`);
  const blob = await response.blob();

  // Create a URL for the blob
  const pdfUrl = URL.createObjectURL(blob);
  console.log(pdfUrl)

  // Open the PDF in a new tab for preview
  window.open(pdfUrl, '_blank');
};
