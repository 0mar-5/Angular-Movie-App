import { Component, inject, signal, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../Services/movies-service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MovieStore } from '../../store/movie.store';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MovieCard } from '../movie-card/movie-card';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-movie-details',
  imports: [
    CardModule,
    CommonModule,
    ButtonModule,
    CarouselModule,
    MovieCard,
    AccordionModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private movieService = inject(MoviesService);
  readonly moviesStore = inject(MovieStore);

  readonly _movie = signal<any | null>(null);
  readonly _reviews = signal<any | null>(null);
  readonly _recommendations = signal<any[] | null>(null);

  private movieSub?: Subscription;
  private recommendationsSub?: Subscription;
  private reviewsSub?: Subscription;
  public mediaType: 'movie' | 'tv' = 'movie';
  loading = true;

  ngOnInit(): void {
    // Show spinner
    this.loading = true;
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const path = this.route.snapshot.routeConfig?.path;

      if (path?.startsWith('tv')) {
        this.mediaType = 'tv';
      } else {
        this.mediaType = 'movie';
      }

      if (id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.movieSub = this.movieService
          .getMovieById(this.mediaType, id)
          .subscribe(
            (data) => {
              this._movie.set(data);
              console.log(this._movie());
              this.loading = false;
              this.recommendationsSub = this.movieService
                .getMediaRecommendations(this.mediaType, id)
                .subscribe((recs) => this._recommendations.set(recs));

              this.reviewsSub = this.movieService
                .getReviews(this.mediaType, id)
                .subscribe((reviews) => {
                  this._reviews.set(reviews);
                  console.log(this._reviews());
                });
            },
            () => {
              // Stop spinner on error too
              this.loading = false;
            }
          );
      }
    });
  }

  accordionIndex = 0;

  ngAfterViewInit(): void {
    // delay the update to avoid ExpressionChanged error
    setTimeout(() => {
      this.accordionIndex = this._reviews()?.length ? 0 : -1;
    });
  }

  getVoteAveragePercent(rate: number): number {
    return Math.round((rate || 0) * 10);
  }

  getColorClass(score: number): string {
    const percent = this.getVoteAveragePercent(score);
    return percent >= 70 ? 'green-stroke' : 'yellow-stroke';
  }

  ngOnDestroy(): void {
    this.movieSub?.unsubscribe();
    this.recommendationsSub?.unsubscribe();
    this.reviewsSub?.unsubscribe();
  }
}
