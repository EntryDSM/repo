import {disableId} from ".";
import {instance} from "../..";
import {toast} from "react-toastify";

export interface CertificateReqBody {
  name: string;
  issuing_institution: string;
  date: number | string;
}

export interface CertificateResType extends CertificateReqBody {
  element_id: string | null;
  feedback: string;
}

export const documentCertificate = (body: CertificateReqBody[]) => {
  const promise = instance.patch("/document/certificate", {
    certificate_list: body,
  })
  toast.promise(promise, {
    pending: "저장 중...",
    success: "저장되었습니다.",
    error: "입력하지 않은 필드가 있습니다."
  }, {
    autoClose: 1000
  });
  return promise;
};
