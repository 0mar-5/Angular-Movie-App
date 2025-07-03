import { Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../Services/movies-service';
import { Subscription } from 'rxjs';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-popular',
  imports: [MovieCard],
  templateUrl: './popular.html',
  styleUrl: './popular.scss',
})
export class Popular implements OnInit, OnDestroy {
  mediaArr = signal<any[]>([]);
  private mediaSub?: Subscription;
  readonly type = input<'movie' | 'tv'>('movie');

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.mediaSub = this.moviesService
      .getPopularMedia(this.type())
      .subscribe((movies) => {
        this.mediaArr.set(movies);
        console.log(this.mediaArr());
      });
  }

  ngOnDestroy(): void {
    this.mediaSub?.unsubscribe();
  }
}
