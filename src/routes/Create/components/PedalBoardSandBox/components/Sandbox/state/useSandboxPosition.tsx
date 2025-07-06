import { create } from 'zustand';

type SandboxPosition = {
  sandboxPosition: {
    top: number
    left: number
    width: number
    height: number
  },
  setSandboxPosition: (position: { top?: number; left?: number; width?: number; height?: number }) => void
}

export const useSandboxPosition = create<SandboxPosition>((set) => ({
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
