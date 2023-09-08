import { disableId } from ".";
import { instance } from "../..";
import { toast } from "react-toastify";

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
  return instance
    .patch("/document/certificate", {
      certificate_list: body,
    })
    .catch((error) => {
      toast("입력하지 않은 필드가 있습니다.", {
        autoClose: 1000,
        type: "error",
      });
    });
};
