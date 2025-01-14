import { create } from "zustand";

type State = {
  tokenList: any;
  updateTokenList: () => void;
  resetTokenList: () => void;
};

const useStore = create<State>((set) => ({
  tokenList: null,
  updateTokenList: () => set((state) => ({ tokenList: state.tokenList })),
  resetTokenList: () => set({ tokenList: 0 }),
}));

export default useStore;
