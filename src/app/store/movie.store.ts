import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

const favMovies: any[] = [];
export const MovieStore = signalStore(
  { providedIn: 'root' },
  withState({
    watchList: favMovies,
  }),
  withComputed((state) => ({
    totalWatchList: computed(() => state.watchList().length),
  })),
  withMethods((state) => ({
    addToWatchList: (event: Event, product: any) => {
      event.stopPropagation();
      const isInWatchList = state
        .watchList()
        .some((item: any) => item.id === product.id);
      patchState(state, {
        watchList: isInWatchList
          ? state.watchList().filter((item: any) => item.id !== product.id)
          : [...state.watchList(), product],
      });
    },

    removeFromWishlist: (productId: string | number) => {
      patchState(state, {
        watchList: state.watchList().filter((p: any) => p.id !== productId),
      });
    },
    isInWatchList: (productId: string | number): boolean => {
      return state.watchList().some((p: any) => p.id === productId);
    },
  }))
);
