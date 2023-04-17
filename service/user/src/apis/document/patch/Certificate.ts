import { instance } from "../..";

export interface CertificateReqBody {
  name: string;
  issuing_institution: string;
  issue_date: Date;
}

export const documnetCertificate = (body: CertificateReqBody[]) => {
  return instance.patch("/document/certificate", body);
};
