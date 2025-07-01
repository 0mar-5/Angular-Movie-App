import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/movies-container/movies-container').then(
        (m) => m.MoviesContainer
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./components/movies-watchList/movies-watchList').then(
        (m) => m.MoviesWatchList
      ),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./components/movie-details/movie-details').then(
        (m) => m.MovieDetails
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage
      ),
  },
];
