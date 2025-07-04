export interface Media {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  overview: string;
  genres: [];
  homepage?: string;
  imdb_id?: string;
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  overview: string;
}
