import { Injectable } from '@angular/core';
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
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // getMovies(): Observable<any> {
  //   return this.http
  //     .get<{ results: any[] }>(`${this.baseUrl}//discover/movie`, {
  //       headers: this.headers,
  //     })
  //     .pipe(map((res) => res.results));
  // }

  getNowPlaying(page: number): Observable<any[]> {
    return this.http
      .get<{ results: any[] }>(
        `https://api.themoviedb.org/3/movie/now_playing?page=${page}`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res.results));
  }
}
