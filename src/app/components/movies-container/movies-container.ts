import { Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { MoviesService } from '../../Services/movies-service';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-container',
  imports: [MovieCard, PaginatorModule, CommonModule, ProgressSpinnerModule],
  templateUrl: './movies-container.html',
  styleUrl: './movies-container.scss',
})
export class MoviesContainer implements OnInit, OnDestroy {
  moviesArr = signal<any[]>([]);
  loading = signal(false);
  private mediaSub?: Subscription;

  readonly type = input<'movie' | 'tv'>('movie');

  first = 0;
  rows = 10;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies(1);
  }

  loadMovies(page: number) {
    this.mediaSub = this.moviesService
      .getMediaPages(this.type(), page)
      .subscribe((movies) => {
        this.moviesArr.set(movies);
      });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    const currentPage = event.page + 1;
    this.loading.set(true);
    this.loadMovies(currentPage);
    // to remove loading spinner after the data loaded
    this.loading.set(false);
    // scroll to the top of the page when data loaded
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.mediaSub?.unsubscribe();
  }
}
