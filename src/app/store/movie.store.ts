import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

function getCurrentUser(): any | null {
  const userData = JSON.parse(localStorage.getItem('userData') || 'null');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find((u: any) => u.id === userData?.id) || null;
}

function updateUserInLocalStorage(updatedUser: any) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const updatedUsers = users.map((user: any) =>
    user.id === updatedUser.id ? updatedUser : user
  );

  localStorage.setItem('users', JSON.stringify(updatedUsers));
  localStorage.setItem('userData', JSON.stringify(updatedUser));
}

export const MovieStore = signalStore(
  { providedIn: 'root' },

  withState({
    movieWatchList: [] as any[],
    tvWatchList: [] as any[],
  }),

  withComputed((state) => ({
    combinedWatchList: computed(() => [
      ...state.movieWatchList(),
      ...state.tvWatchList(),
    ]),
    totalCombinedWatchList: computed(
      () => state.movieWatchList().length + state.tvWatchList().length
    ),
  })),

  withMethods((state) => {
    return {
      addToWatchList: (
        event: Event,
        product: any,
        type: 'movie' | 'tv'
      ): boolean | null => {
        event.stopPropagation();

        const user = getCurrentUser();
        if (!user) return null;

        const listKey = type === 'movie' ? 'movieWatchList' : 'tvWatchList';
        const currentList = state[listKey]() as any[];

        const isInWatchList = currentList.some(
          (item) => item.id === product.id
        );

        const updatedList = isInWatchList
          ? currentList.filter((item) => item.id !== product.id)
          : [...currentList, product];

        patchState(state, { [listKey]: updatedList });

        user[listKey] = updatedList;
        updateUserInLocalStorage(user);

        return !isInWatchList;
      },

      removeFromWatchList: (
        productId: string | number,
        type: 'movie' | 'tv'
      ) => {
        const user = getCurrentUser();
        if (!user) return;

        const listKey = type === 'movie' ? 'movieWatchList' : 'tvWatchList';
        const updatedList = state[listKey]().filter(
          (p: any) => p.id !== productId
        );

        patchState(state, { [listKey]: updatedList });
        user[listKey] = updatedList;
        updateUserInLocalStorage(user);
      },

      clearWatchList: () => {
        const user = getCurrentUser();
        if (!user) return;

        patchState(state, {
          movieWatchList: [],
          tvWatchList: [],
        });

        user.movieWatchList = [];
        user.tvWatchList = [];
        updateUserInLocalStorage(user);
      },

      isInWatchList: (
        productId: string | number,
        type: 'movie' | 'tv'
      ): boolean => {
        const listKey = type === 'movie' ? 'movieWatchList' : 'tvWatchList';
        return state[listKey]().some((p: any) => p.id === productId);
      },

      loadUserWatchList: () => {
        const user = getCurrentUser();
        if (user) {
          patchState(state, {
            movieWatchList: user.movieWatchList || [],
            tvWatchList: user.tvWatchList || [],
          });
        }
      },
    };
  })
);
