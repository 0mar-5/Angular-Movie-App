import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../Services/movies-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MovieStore } from '../../store/movie.store';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-details',
  imports: [CardModule, CommonModule, ButtonModule, CarouselModule, MovieCard],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails implements OnInit, OnDestroy {
  readonly _movie = signal<any | null>(null);
  readonly _recommendations = signal<[] | null>(null);

  moviesStore = inject(MovieStore);
  private movieObserval?: Subscription;
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId) {
        console.log('Fetching movie:', movieId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.movieObserval = this.movieService
          .getMovieById(movieId)
          .subscribe((data) => {
            this._movie.set(data);
            console.log(this._movie());

            this.movieService
              .getMoviesRecommendations(movieId)
              .subscribe((movies: any) => {
                this._recommendations.set(movies);
                console.log(this._recommendations());
              });
          });
      }
    });
  }

  getVoteAveragePercent(movieRate: number): number {
    return Math.round((movieRate || 0) * 10);
  }
  getColorClass(score: number): string {
    const percent = this.getVoteAveragePercent(score);
    return percent >= 70 ? 'green-stroke' : 'yellow-stroke';
  }

  ngOnDestroy(): void {
    if (this.movieObserval) {
      this.movieObserval.unsubscribe();
    }
  }
}
