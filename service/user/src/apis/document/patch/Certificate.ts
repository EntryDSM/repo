import { disableId } from ".";
import { instance } from "../..";

export interface CertificateReqBody {
  name: string;
  issuing_institution: string;
  issue_date: string;
}

export interface CertificateResType extends CertificateReqBody {
  document_id: string;
  element_id: string;
  feedback: string;
}

export const documnetCertificate = (body: CertificateResType[]) => {
  return instance.patch("/document/certificate", {
    certificate_list: body
      .map(disableId)
      .map((date) => ({ ...date, date: date.issue_date })),
  });
};
