import { instance } from "..";

interface CertificateReqBody {
  name: string;
  issuing_institution: string;
  date: Date;
}

export const documnetCertificate = (body: CertificateReqBody[]) => {
  return instance.patch("/document/certificate", body);
};
