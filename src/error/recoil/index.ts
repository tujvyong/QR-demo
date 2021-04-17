import { atom } from 'recoil';

export interface ErrorState {
  isError: boolean;
  errorMessage: string | undefined;
}

const initState: ErrorState = {
  isError: false,
  errorMessage: undefined
};

export const errorState = atom<ErrorState>({
  key: 'error',
  default: initState
});
