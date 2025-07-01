import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { MovieCard } from './components/movie-card/movie-card';
import { MoviesContainer } from './components/movies-container/movies-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Hero, MovieCard, MoviesContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Angular-Movie-App';
}
