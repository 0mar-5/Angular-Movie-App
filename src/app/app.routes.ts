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
    path: 'watchlist',
    loadComponent: () =>
      import('./components/movies-watchList/movies-watchList').then(
        (m) => m.MoviesWatchList
      ),
  },
  {
    path: 'tv',
    loadComponent: () =>
      import('./components/tv-container/tv-container').then(
        (m) => m.TvContainer
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
    path: 'tv/:id',
    loadComponent: () =>
      import('./components/movie-details/movie-details').then(
        (m) => m.MovieDetails
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./components/search/search').then((m) => m.Search),
  },
  {
    path: 'popular-movies',
    loadComponent: () =>
      import('./components/popular-movies/popular-movies').then(
        (m) => m.PopularMovies
      ),
  },
  {
    path: 'popular-tv',
    loadComponent: () =>
      import('./components/popular-tv/popular-tv').then((m) => m.PopularTv),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage
      ),
  },
];
