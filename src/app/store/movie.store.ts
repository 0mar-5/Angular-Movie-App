import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

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

  withMethods((state) => ({
    addToWatchList: (event: Event, product: any, type: 'movie' | 'tv') => {
      event.stopPropagation();

      const listKey = type === 'movie' ? 'movieWatchList' : 'tvWatchList';
      const currentList = state[listKey]() as any[];

      const isInWatchList = currentList.some(
        (item: any) => item.id === product.id
      );

      patchState(state, {
        [listKey]: isInWatchList
          ? currentList.filter((item: any) => item.id !== product.id)
          : [...currentList, product],
      });
    },

    removeFromWatchList: (productId: string | number, type: 'movie' | 'tv') => {
      const listKey = type === 'movie' ? 'movieWatchList' : 'tvWatchList';
      patchState(state, {
        [listKey]: state[listKey]().filter((p: any) => p.id !== productId),
      });
    },

    isInWatchList: (
      productId: string | number,
      type: 'movie' | 'tv'
    ): boolean => {
      const listKey = type === 'movie' ? 'movieWatchList' : 'tvWatchList';
      return state[listKey]().some((p: any) => p.id === productId);
    },
  }))
);
