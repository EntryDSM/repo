import { disableId } from ".";
import { instance } from "../..";

export interface CertificateReqBody {
  name: string;
  issuing_institution: string;
  date: string;
}

export interface CertificateResType extends CertificateReqBody {
  element_id: string;
  feedback: string;
}

export const documnetCertificate = (body: CertificateResType[]) => {
  console.log(body);
  return instance.patch("/document/certificate", {
    certificate_list: body.map(disableId),
  });
};
