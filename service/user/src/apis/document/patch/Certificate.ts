import { disableId } from ".";
import { instance } from "../..";

export interface CertificateReqBody {
  name: string;
  issuing_institution: string;
  date: number | string;
}

export interface CertificateResType extends CertificateReqBody {
  element_id: string | null;
  feedback: string;
}

export const documnetCertificate = (body: CertificateReqBody[]) => {
  return instance.patch("/document/certificate", {
    certificate_list: body,
  });
};
