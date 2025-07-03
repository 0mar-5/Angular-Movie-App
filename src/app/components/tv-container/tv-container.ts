import { Component, OnInit, signal } from '@angular/core';
import { MoviesContainer } from '../movies-container/movies-container';

@Component({
  selector: 'app-tv-container',
  imports: [MoviesContainer],
  templateUrl: './tv-container.html',
  styleUrl: './tv-container.scss',
})
export class TvContainer {}
