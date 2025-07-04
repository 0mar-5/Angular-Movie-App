import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTY0NGYyYTE2ZDA0MjNhZWI1YzU5N2RlZTk5ODMzNCIsIm5iZiI6MTc0NzU1NDA1NS4yMTgsInN1YiI6IjY4Mjk4ZjA3ZDViMjFmNjM2ODY0ODgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YFZHsdktsmSqSOVRNH8Mkm2b55uTlvFm1py01DTudS8',
  });

  constructor(private http: HttpClient) {}

  getMovieById(type: 'movie' | 'tv', id: number | string): Observable<any> {
    return this.http.get<{ results: any[] }>(
      `https://api.themoviedb.org/3/${type}/${id}`,
      {
        headers: this.headers,
      }
    );
  }

  getMediaPages(type: 'movie' | 'tv', page: number): Observable<any[]> {
    let url: string = '';
    if (type === 'movie') {
      url = `https://api.themoviedb.org/3/movie/now_playing?page=${page}&language=en`;
    } else {
      url = `https://api.themoviedb.org/3/tv/on_the_air?page=${page}&language=en`;
    }
    return this.http
      .get<{ results: any[] }>(url, {
        headers: this.headers,
      })
      .pipe(map((res) => res.results));
  }

  getMediaRecommendations(type: 'movie' | 'tv', movieId: string | number) {
    return this.http
      .get<{ results: any[] }>(
        `https://api.themoviedb.org/3/${type}/${movieId}/recommendations`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res.results));
  }

  search(query: string): Observable<any[]> {
    return this.http
      .get<{ results: any[] }>(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res.results));
  }

  getReviews(type: 'movie' | 'tv', mediaId: string): Observable<any[]> {
    return this.http
      .get<{ results: any[] }>(
        `https://api.themoviedb.org/3/${type}/${mediaId}/reviews`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res.results));
  }

  getPopularMedia(type: 'movie' | 'tv') {
    return this.http
      .get<{ results: any[] }>(
        ` https://api.themoviedb.org/3/${type}/popular`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res.results));
  }
}
