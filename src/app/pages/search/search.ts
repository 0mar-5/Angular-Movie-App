import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieCard } from '../../components/movie-card/movie-card';
import { MoviesService } from '../../Services/movies-service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule, MovieCard],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnDestroy {
  private moviesService = inject(MoviesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private searchTrigger = new Subject<string>();
  private searchSub?: Subscription;

  searchQuery = signal('');
  searchResults = signal<any[]>([]);
  isLoading = signal(false);

  constructor() {
    this.route.queryParams.subscribe((params: any) => {
      const query = params['query']?.trim();
      if (query) {
        this.searchQuery.set(query);
        this.search(query);
      }
    });

    this.searchSub = this.searchTrigger
      .pipe(debounceTime(400))
      .subscribe((value: string) => {
        const query = value.trim();
        if (!query) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/search'], {
            queryParams: { query },
          });
          this.search(query);
        }
      });
  }

  handleInput(value: string) {
    this.searchQuery.set(value);
    this.searchTrigger.next(value);
  }

  private search(query: string) {
    this.isLoading.set(true);
    this.moviesService.search(query).subscribe((res: any) => {
      this.searchResults.set(res);
      this.isLoading.set(false);
    });
  }

  triggerSearch() {
    const query = this.searchQuery().trim();
    this.searchTrigger.next(query);
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }
}
