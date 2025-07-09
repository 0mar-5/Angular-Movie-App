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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { SafeUrlPipe } from '../../../pipe/safe-url-pipe-pipe';
import { ChangeDetectorRef } from '@angular/core';

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
    ToastModule,
    DialogModule,
    SafeUrlPipe,
  ],
  providers: [MessageService],

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

  messageService = inject(MessageService);

  private movieSub?: Subscription;
  private recommendationsSub?: Subscription;
  private reviewsSub?: Subscription;
  private trailerSub?: Subscription;
  public mediaType: 'movie' | 'tv' = 'movie';

  loading = true;
  constructor(private cdRef: ChangeDetectorRef) {}

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
              this.loading = false;
              this.recommendationsSub = this.movieService
                .getMediaRecommendations(this.mediaType, id)
                .subscribe((recs) => this._recommendations.set(recs));

              this.reviewsSub = this.movieService
                .getReviews(this.mediaType, id)
                .subscribe((reviews) => {
                  this._reviews.set(reviews);
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
  trailerUrl: string | null = null;
  trailerDialogVisible: boolean = false;

  openTrailer(type: 'movie' | 'tv', id: number): void {
    this.movieService.getMovieTrailer(type, id).subscribe({
      next: (url) => {
        this.trailerUrl = url;

        setTimeout(() => {
          this.trailerDialogVisible = true;
          this.cdRef.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error loading trailer:', err);
        this.trailerUrl = null;

        setTimeout(() => {
          this.trailerDialogVisible = true;
          this.cdRef.detectChanges();
        });
      },
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

  // Responsive Carousel
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '400px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  toggleWatchList(event: Event, media: any, type: 'movie' | 'tv') {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (!isLoggedIn) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Login Required',
        detail: 'You must be logged in to manage your watchlist.',
      });
      return;
    }

    const isInWatchList = this.moviesStore.isInWatchList(media.id, type);
    this.moviesStore.addToWatchList(event, media, type);

    this.messageService.add({
      severity: isInWatchList ? 'warn' : 'success',
      summary: isInWatchList ? 'Removed' : 'Added',
      detail: `${media.title || media.name} ${
        isInWatchList ? 'removed from' : 'added to'
      } your watchlist.`,
    });
  }

  onWatchListToggled(event: { added: boolean; media: any }) {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (!isLoggedIn) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Login Required',
        detail: 'You must be logged in to manage your watchlist.',
      });
      return;
    }
    this.messageService.add({
      severity: event.added ? 'success' : 'warn',
      summary: event.added ? 'Added' : 'Removed',
      detail: `${event.media.title || event.media.name} ${
        event.added ? 'added to' : 'removed from'
      } your watchlist.`,
    });
  }

  ngOnDestroy(): void {
    this.movieSub?.unsubscribe();
    this.recommendationsSub?.unsubscribe();
    this.reviewsSub?.unsubscribe();
    this.trailerSub?.unsubscribe();
  }
}
