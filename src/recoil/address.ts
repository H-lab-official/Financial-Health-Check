import { atom } from 'recoil';
import { persistAtom } from './persistRecoilState';

export const addressPlans = atom({
  key: 'addressPlans',
  default: [],
  // effects_UNSTABLE: [persistAtom({ key: 'addressPlans' })],
});

export const historyAddress = atom({
  key: 'historyAddress',
  default: [],
  // effects_UNSTABLE: [persistAtom({ key: 'historyAddress' })],
});
