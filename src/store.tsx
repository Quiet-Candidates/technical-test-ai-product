import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { CATEGORIES, PHOTOS, PHOTOS_BY_ID, type CategoryId, type Photo } from './data';

type State = {
  /** Gone for good. */
  deleted: string[];
  /** Reviewed and kept, so we stop showing them. */
  kept: string[];
  /** Swiped left, waiting for the user to confirm on the review screen. */
  marked: string[];
  /** Swipe order, most recent last. Powers undo. */
  history: string[];
  /** Running total of what the user has queued up. */
  pendingBytes: number;
  isPremium: boolean;
  lastFreedBytes: number;
  lastBiggestBytes: number;
};

type Action =
  | { type: 'mark'; id: string }
  | { type: 'keep'; id: string }
  | { type: 'undo' }
  | { type: 'commit'; ids: string[]; biggestBytes: number }
  | { type: 'restorePurchases' }
  | { type: 'subscribe' }
  | { type: 'reset' };

const initialState: State = {
  deleted: [],
  kept: [],
  marked: [],
  history: [],
  pendingBytes: 0,
  isPremium: false,
  lastFreedBytes: 0,
  lastBiggestBytes: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'mark': {
      const photo = PHOTOS_BY_ID[action.id];
      return {
        ...state,
        marked: [...state.marked, action.id],
        history: [...state.history, action.id],
        pendingBytes: state.pendingBytes + photo.bytes,
      };
    }

    case 'keep':
      return {
        ...state,
        kept: [...state.kept, action.id],
        history: [...state.history, action.id],
      };

    case 'undo': {
      const id = state.history[state.history.length - 1];
      if (!id) return state;
      return {
        ...state,
        history: state.history.slice(0, -1),
        marked: state.marked.filter((x) => x !== id),
        kept: state.kept.filter((x) => x !== id),
      };
    }

    case 'commit':
      return {
        ...state,
        deleted: [...state.deleted, ...action.ids],
        marked: state.marked.filter((x) => !action.ids.includes(x)),
        lastFreedBytes: state.pendingBytes,
        lastBiggestBytes: action.biggestBytes,
        pendingBytes: 0,
      };

    case 'restorePurchases':
      // Nothing to restore unless this account already owns a subscription.
      if (!state.isPremium) return state;
      return { ...state, isPremium: true };

    case 'subscribe':
      return { ...state, isPremium: true };

    case 'reset':
      return initialState;
  }
}

type Store = {
  state: State;
  dispatch: React.Dispatch<Action>;
  /** Photos still waiting to be reviewed, by category. */
  pendingIn: (category: CategoryId) => Photo[];
  markedPhotos: Photo[];
  totals: { bytes: number; count: number };
  perCategory: Record<CategoryId, { count: number; bytes: number }>;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<Store>(() => {
    const resolved = new Set([...state.deleted, ...state.kept, ...state.marked]);
    const pendingIn = (category: CategoryId) =>
      PHOTOS.filter((p) => p.category === category && !resolved.has(p.id));

    const remaining = PHOTOS.filter((p) => !state.deleted.includes(p.id));

    const perCategory = {} as Record<CategoryId, { count: number; bytes: number }>;
    for (const c of CATEGORIES) {
      const list = pendingIn(c.id);
      perCategory[c.id] = {
        count: list.length,
        bytes: list.reduce((sum, p) => sum + p.bytes, 0),
      };
    }

    return {
      state,
      dispatch,
      pendingIn,
      markedPhotos: state.marked.map((id) => PHOTOS_BY_ID[id]),
      totals: {
        count: remaining.length,
        bytes: CATEGORIES.reduce((sum, c) => sum + perCategory[c.id].bytes, 0),
      },
      perCategory,
    };
  }, [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore must be used inside a StoreProvider');
  return store;
}
