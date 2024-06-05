import { atom, selector } from "recoil";

export interface nameState {
    nickname: string,
    age: number
}
export const nameState = atom<nameState>({
    key: "nameState",
    default: {
        nickname: "",
        age: 0
    }
})