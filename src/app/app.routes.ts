import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'watchlist',
    canActivate: [AuthGuard],
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
    loadComponent: () => import('./pages/search/search').then((m) => m.Search),
  },
  {
    path: 'popular-movies',
    loadComponent: () =>
      import('./pages/popular-movies/popular-movies').then(
        (m) => m.PopularMovies
      ),
  },
  {
    path: 'popular-tv',
    loadComponent: () =>
      import('./pages/popular-tv/popular-tv').then((m) => m.PopularTv),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page').then((m) => m.RegisterPage),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then(
        (m) => m.NotFoundPage
      ),
  },
];
