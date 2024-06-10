import { atom, selector } from "recoil";

export interface progressState {
    percent: number,
    steps:number
 
}
// export interface selectedState{
//     selectedValue:string
// }
export const progressState = atom<progressState>({
    key: "progressState",
    default: {
        percent:0,
        steps:16
    }
})
export const selectedState=atom<string>({
    key:"selectedState",
    default:"",
})


