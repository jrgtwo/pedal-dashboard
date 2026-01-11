import { create } from 'zustand'

type initStateType = {
  [key: string]: string;
}

type StateCreator<T extends object> = (set: (fn: (state: T) => T) => void, get: () => T) => T;

const createStateNode = <T extends object>(initialState: StateCreator<T>) => create<T>((set, get) => ({
  ...initialState(set, get)
}));

class NamespacedState {
  state = new Map();

  constructor(initState?: initStateType) {
    if (initState) {
      this.setInitialState(initState);
    }
  }

  setInitialState(initState: initStateType) {
    console.log("Initializing state with:", initState);
  }

  addNamespace<T extends object>(namespace: string, state: StateCreator<T>) {
    if (!this.state.has(namespace)) {
      this.state.set(namespace, createStateNode(state));
    }
  }

  get(key: string) {
    const parsedKey = key.split('.');
    if (parsedKey.length !== 2) {
      throw new Error('Key must be in the format "namespace.property"');
    }
    const [namespace, property] = parsedKey;
    const namespaceStore = this.state.get(namespace);
    if (!namespaceStore) {
      throw new Error(`Namespace "${namespace}" does not exist`);
    }

    return namespaceStore.get()[property];
  }

  getSpace(namespace: string) {
    const namespaceStore = this.state.get(namespace);
    if (!namespaceStore) {
      throw new Error(`Namespace "${namespace}" does not exist`);
    }
    return namespaceStore;
  }
}

const NamespacedStateSingleton = new NamespacedState();
export { NamespacedState, NamespacedStateSingleton as GlobalState };
