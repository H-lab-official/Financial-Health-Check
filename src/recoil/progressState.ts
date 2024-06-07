import { atom, selector } from "recoil";

export interface progressState {
    percent: number,
    steps:number
 
}
export const progressState = atom<progressState>({
    key: "progressState",
    default: {
        percent:0,
        steps:16
    }
})