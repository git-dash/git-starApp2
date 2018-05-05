import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';


import { environment, movieLinks } from '../../../environments/environment';
import { Movie, SearchedMovie, MovieDetails, Video } from '../../entity/movie';
import { merge } from 'rxjs/observable/merge';
import { switchMap } from 'rxjs/operator/switchMap';
import { startWith } from 'rxjs/operators/startWith';




@Injectable()
export class MovieService {


  constructor(private httpClient: HttpClient) { }


  /*

    1. https://codecraft.tv/courses/angular/http/http-with-observables/ - async pipe
    2. https://image.tmdb.org/t/p/original/2RDUQpzhJHVzObkL4ZxwJkbKYSz.jpg - image
    3. themoviedb - https://www.themoviedb.org/settings/api
    4. example - https://api.themoviedb.org/3/search/movie?api_key=b12176cbe4608313502b204789b0dbb8&query=the+avengers
   */

  getMovieList(movieName, pageIndex: number) {

    const requestURL =
      movieName === '' || movieName === null ?
        `${environment.movie.intPopularMovieList}&page=${pageIndex}` :
        `${environment.movie.searchByName}&page=${pageIndex}&query=${movieName}`;

    return this.httpClient
      .get<any>(requestURL)
      .delay(1000)
      .map(data => {


        console.log('came from observabledatasource map ' + data);

        const searchedMovies = new SearchedMovie(
          data.page,
          data.total_pages,
          data.total_results,
          data.results.map(movie => {
            return new Movie(
              movie.id,
              environment.movie.imageURL + movie.poster_path,
              movie.release_date,
              movie.overview,
              movie.popularity,
              movie.genre_ids.map(id => environment.movie.genreList.find(fGenre => fGenre.id === id).name)
              , movie.title
            );
          }),
        );

        return searchedMovies;
        // return data['results'].map(movie => {
        //   return new Movie(
        //     movie.id,
        //     environment.movie.imageURL + movie.poster_path,
        //     movie.release_date,
        //     movie.overview,
        //     movie.popularity,
        //     movie.genre_ids.map(id => environment.movie.genreList.find(fGenre => fGenre.id = id).name)
        //   );
        // });
      });

    // const apiURL = `${environment.movie.intPopularMovieList}`;
    // return this.httpClient.get(apiURL);
  }

  getObservableMovieList() {
    console.log('came here');

    const apiURL =
      // ${environment.movie.intPopularMovieList}
      `
      https://api.themoviedb.org/3/search/movie?api_key=${movieLinks.api_key}&query=hulk&page=2
      `;

    return this.httpClient.get(apiURL)
      .map((list: Response) => {

        console.log(list, '2');
        return list['results'].map(movie => {
          return new Movie(
            movie.id,
            environment.movie.imageURL + movie.poster_path,
            movie.release_date,
            movie.overview,
            movie.popularity,
            movie.genre_ids.map(id => environment.movie.genreList.find(fGenre => fGenre.id = id).name),
            movie.title

          );
          // this.getGenreNames(movie.genre_ids), );
        });

      });
  }

  // new method
  getObservableDataSource(paginator, firstTime, movieName) {


    const url =
      firstTime ?
        `${environment.movie.intPopularMovieList}&page=${paginator.pageIndex}` :
        `${environment.movie.searchByName}&page=${paginator.pageIndex}&query=${movieName}`;

    return this.httpClient
      .get<any>(url)
      .map(data => {
        console.log('came from observabledatasource map ' + data);

        return data['results'].map(movie => {
          return new Movie(
            movie.id,
            environment.movie.imageURL + movie.poster_path,
            movie.release_date,
            movie.overview,
            movie.popularity,
            movie.genre_ids.map(id => environment.movie.genreList.find(fGenre => fGenre.id = id).name),
            movie.title
          );
          // this.getGenreNames(movie.genre_ids), );
        });
      });



  }


  getMovieDetails(movieId) {
    const requestURL
      = `${environment.movie.movieDetailsURL + movieId + environment.movie.movieAppendAttribute} `;

    return this.httpClient
      .get(requestURL)
      .map((data: any) => {
        console.log(data);
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
            data.credits.cast.map(cast => {
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
