import { instance } from "../..";

export interface CertificateReqBody {
  name: string;
  issuing_institution: string;
  issue_date: Date;
}

export interface CertificateResType extends CertificateReqBody {
  document_id: string;
  element_id: string;
  feedback: string;
}

export const documnetCertificate = (body: CertificateReqBody[]) => {
  return instance.patch("/document/certificate", body);
};
