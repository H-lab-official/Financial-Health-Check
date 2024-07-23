import { atom } from "recoil";


export interface nameData {
  user_params: string;
  nickname: string;
  age: string;
  gender:string
}

export const nameState = atom<nameData>({
  key: "nameState",
  default: {
    user_params: "",
    nickname: "",
    age: "",
    gender:""
  },
});


