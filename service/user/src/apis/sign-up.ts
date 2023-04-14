import { instance } from ".";

interface postSignUpBody {
  name: string;
  email: string;
  grade: number;
  class_num: number;
  number: number;
}

export const postSignUp = (body: postSignUpBody) => {
  return instance.post<postSignUpBody>("/student", body);
};
