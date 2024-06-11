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
export const selectedState = atom<string[]>({
    key: 'selectedState',
    default: [],
  });
  
 export const sortedSelectedState = selector<string[]>({
    key: 'sortedSelectedState',
    get: ({ get }) => {
      const selected = get(selectedState);
      return [...selected].sort();
    },
  });

 export const currentIndexState = atom<number>({
    key: 'currentIndexState',
    default: 0,
  });