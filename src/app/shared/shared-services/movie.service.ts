import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { merge } from 'rxjs/observable/merge';
import { switchMap } from 'rxjs/operator/switchMap';
import { startWith } from 'rxjs/operators/startWith';

import { Movie, SearchedMovie, MovieDetails, Video } from '../../entity/movie';
import { environment, movieLinks } from '../../../environments/environment';



@Injectable()
export class MovieService {
  constructor(private httpClient: HttpClient) { }
  getMovieList(movieName, pageIndex: number) {

    const requestURL =
      movieName === '' || movieName === null ?
        `${environment.movie.intPopularMovieList}&page=${pageIndex}` :
        `${environment.movie.searchByName}&page=${pageIndex}&query=${movieName}`;

    return this.httpClient
      .get<SearchedMovie>(requestURL)
      .delay(1000)
      .map(data => {
        const searchedMovies = new SearchedMovie(
          data.page,
          data.total_pages,
          data.total_results,
          data.results.map((movie: any) => {
            return new Movie(
              movie.id,
              environment.movie.imageURL + movie.poster_path,
              movie.release_date,
              movie.overview,
              movie.popularity,
              movie.genre_ids.map(id => environment.movie.genreList.find(fGenre => fGenre.id === id).name)
              , movie.title
            );
          }).sort((a: Movie, b: Movie) => b.popularity - a.popularity),
        );

        return searchedMovies;
      });
  }


  getMovieDetails(movieId) {
    const requestURL
      = `${environment.movie.movieDetailsURL + movieId + environment.movie.movieAppendAttribute} `;

    return this.httpClient
      .get(requestURL)
      .map((data: any) => {
        //  console.log(data);
        const test = {
          id: movieId,
          runtime: data.runtime,
          vote_average: data.vote_average,
          spoken_languages: data.spoken_languages.map(lan => lan.name),
          revenue: data.revenue,
          tagline: data.tagline,
          cost: Math.floor(Math.random() * 500),
          videos: data.videos.results.map(vid => {
            return {
              type: vid.type,
              size: vid.size,
              name: vid.name,
              key: environment.movie.videoURL + vid.key,
            };

          }),
          cast:
            data.credits.cast
              .filter(cast => cast.profile_path != null)
              .map(cast => {
                return {
                  order: cast.order,
                  character: cast.character,
                  name: cast.name,
                  profile_path: cast.profile_path !== null
                    ? environment.movie.imageURL + cast.profile_path : '',
                };
              })
              .slice(1, 6),
          crew:
            data.credits.crew
              .filter(crew => crew.profile_path != null)
              .map((cast, index) => {
                return {
                  order: index,
                  character: cast.job,
                  name: cast.name,
                  profile_path: cast.profile_path !== null
                    ? environment.movie.imageURL + cast.profile_path : '',
                };

              })
              .slice(1, 6),
        };
        return test;
      })
      ;

    // return requestURL;

    // https://api.themoviedb.org/3/movie/550?api_key=b12176cbe4608313502b204789b0dbb8&append_to_response=credits,videos
  }
}
