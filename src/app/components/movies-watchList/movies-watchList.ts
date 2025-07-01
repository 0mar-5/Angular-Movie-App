import { Component, inject } from '@angular/core';
import { MovieStore } from '../../store/movie.store';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-watchList ',
  imports: [CardModule, CommonModule],
  templateUrl: './movies-watchList.html',
  styleUrl: './movies-watchList.scss',
})
export class MoviesWatchList {
  moviesStore = inject(MovieStore);

  test() {
    console.log(this.moviesStore.totalWatchList());
  }
}
