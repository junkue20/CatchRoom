import { atom } from 'recoil';

export const isModalState = atom({
  key: 'isModalState',
  default: false,
});

export const deleteModalIdAtom = atom({
  key: 'deleteModalIdAtom',
  default: '',
});
