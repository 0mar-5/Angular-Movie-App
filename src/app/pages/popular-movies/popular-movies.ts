import { Component } from '@angular/core';
import { Popular } from '../../components/popular/popular';

@Component({
  selector: 'app-popular-movies',
  imports: [Popular],
  templateUrl: './popular-movies.html',
  styleUrl: './popular-movies.scss',
})
export class PopularMovies {}
