import { Component } from '@angular/core';
import { MoviesContainer } from '../movies-container/movies-container';
import { Search } from '../../pages/search/search';

@Component({
  selector: 'app-tv-container',
  imports: [MoviesContainer, Search],
  templateUrl: './tv-container.html',
  styleUrl: './tv-container.scss',
})
export class TvContainer {}
