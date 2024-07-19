import { atom, DefaultValue } from 'recoil';

export const persistAtom = ({ key, storage = localStorage }) => ({ setSelf, onSet }) => {
  const savedValue = storage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    if (isReset || newValue instanceof DefaultValue) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, JSON.stringify(newValue));
    }
  });
};
