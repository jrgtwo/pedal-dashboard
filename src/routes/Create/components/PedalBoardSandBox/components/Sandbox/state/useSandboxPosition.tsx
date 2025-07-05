import { create } from 'zustand';

export const useSandboxPosition = create((set) => ({
  sandboxPosition: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  setSandboxPosition: (position: { top?: number; left?: number; width?: number; height?: number }) => set((state) => {
    return { sandboxPosition: { ...state.sandboxPosition, ...position } }
  }),
}));
