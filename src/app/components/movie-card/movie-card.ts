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
  messageService = inject(MessageService);

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
    const isInWatchList = this.moviesStore.isInWatchList(media.id, type);

    this.moviesStore.addToWatchList(event, media, type);
    this.watchListToggled.emit({ added: !isInWatchList, media });

    this.messageService.add({
      severity: isInWatchList ? 'warn' : 'success',
      summary: isInWatchList ? 'Removed' : 'Added',
      detail: `${media.title || media.name} has been ${
        isInWatchList ? 'removed from' : 'added to'
      } your watchlist.`,
    });
  }
}
