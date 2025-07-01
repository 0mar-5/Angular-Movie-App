import { Component, OnInit, signal } from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { MoviesService } from '../../Services/movies-service';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-movies-container',
  imports: [MovieCard, PaginatorModule],
  templateUrl: './movies-container.html',
  styleUrl: './movies-container.scss',
})
export class MoviesContainer implements OnInit {
  moviesArr = signal<any[]>([]);
  first = 0;
  rows = 10;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies(1);
  }

  loadMovies(page: number) {
    this.moviesService.getNowPlaying(page).subscribe((movies) => {
      this.moviesArr.set(movies);
      console.log(this.moviesArr());
    });
  }

  onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    const currentPage = event.page + 1;
    this.loadMovies(currentPage);
  }
}
