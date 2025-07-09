import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { KnobModule } from 'primeng/knob';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { MovieStore } from '../../store/movie.store';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-movie-card',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    RatingModule,
    ButtonModule,
    KnobModule,
    RouterLink,
    ToastModule,
  ],
  providers: [MessageService],

  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  moviesStore = inject(MovieStore);
  readonly _mediaData = input<any>();
  readonly type = input<'movie' | 'tv'>('movie');

  constructor(private messageService: MessageService) {}

  getVoteAveragePercent(movieRate: number): number {
    return Math.round((movieRate || 0) * 10);
  }
  getColorClass(score: number): string {
    const percent = this.getVoteAveragePercent(score);
    return percent >= 70 ? 'green-stroke' : 'yellow-stroke';
  }
  @Output() watchListToggled = new EventEmitter<{
    added: boolean;
    media: any;
  }>();

  // if the image did not found
  fallbackImage = 'https://placehold.co/350x400';

  getImageUrl(media: any): string {
    return media.poster_path || media.profile_path
      ? 'https://image.tmdb.org/t/p/w500' +
          (media.poster_path || media.profile_path)
      : this.fallbackImage;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;

    if (target.src !== this.fallbackImage) {
      target.src = this.fallbackImage;
    }
  }
  // adding toster to the ui
  handleWatchList(event: Event, media: any, type: 'movie' | 'tv') {
    const result = this.moviesStore.addToWatchList(event, media, type);

    if (result === null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Login Required',
        detail: 'You must be logged in to add items to your favorites.',
      });
      return;
    }

    this.watchListToggled.emit({ added: result, media });

    this.messageService.add({
      severity: result ? 'success' : 'info',
      summary: result ? 'Added' : 'Removed',
      detail: `${media.title || media.name} has been ${
        result ? 'added to' : 'removed from'
      } your favorites.`,
    });
  }
}
