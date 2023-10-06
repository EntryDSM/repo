import {disableId} from ".";
import {instance} from "../..";
import {toast} from "react-toastify";

export interface ProfileImgBody {
    profile_image_path: string
}

export interface ProfileImgRes {
    element_id: string;
    feedback: string;
}

export const profileImage = (body: ProfileImgBody) => {
    const promise = instance.patch("/document/profile-image", body)
    toast.promise(promise, {
        error: "이미지 업로드 실패..."
    })
    return promise;
};
