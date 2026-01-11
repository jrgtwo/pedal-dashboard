import { NamespacedState } from "./namespacedStoreCreator";

const PedalDashboardState = new NamespacedState({
  pedalDashboard: (set) => ({
    val: 0,
    setVal: (newVal: number) => set(() => ({ val: newVal })),
  })
});

export { PedalDashboardState };
