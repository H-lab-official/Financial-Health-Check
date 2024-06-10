import { atom, selector } from "recoil";

export interface nameState {
    user_params:string,
    nickname: string,
    age: string
}
export const nameState = atom<nameState>({
    key: "nameState",
    default: {
        user_params:"4685tccb",
        nickname: "",
        age: ""
    }
})