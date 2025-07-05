import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { MoviesContainer } from '../../components/movies-container/movies-container';

@Component({
  selector: 'app-home-page',
  imports: [Hero, MoviesContainer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
