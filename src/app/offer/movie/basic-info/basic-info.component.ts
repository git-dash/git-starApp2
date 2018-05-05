import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MovieService } from '../../../shared/shared-services/movie.service';
import { MatDialog } from '@angular/material';
import { PlayVideoComponent } from '../play-video/play-video.component';
import { Video } from '../../../entity/movie';
import { ConfirmModalComponent } from '../../../shared/shared-material/confirm-modal/confirm-modal.component';
import { DbFirebaseService } from '../../../shared/shared-services/db-firebase.service';


@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() shortMovie: any;

  sample$: any;
  purchasedMovies: number[] = [];
  constructor(private movieService: MovieService, private dialog: MatDialog, private dbService: DbFirebaseService) { }
  ngOnInit(): void {
    //  throw new Error("Method not implemented.");
    console.log('came in basic info card');
    this.purchasedMovies = this.dbService.getStoreData('purchasedMovies') || [];
    this.sample$ =
      this.movieService.getMovieDetails(this.shortMovie.id)
        .do(data => {
          console.log(data);
          if (this.purchasedMovies
            .findIndex(mov => mov === data.id) > -1) {
            this.purchasedMovies.push(data.id);
            this.dbService.setStoreData('purchasedMovies', this.purchasedMovies);
          }
        });
  }


  getMovieDetails(movieId) {


    // console.log(this.movieService.getMovieDetails(movieId));
    this.sample$ =
      this.movieService.getMovieDetails(movieId)
      ;
  }
  confirmViewOption(id, title, releaseDate, videoList, cost) {

    const dialogRef = this.dialog.open(
      ConfirmModalComponent,
      {
        height: '250px',
        data: {
          title: 'Movie ', confirmMessage: `Do you want to Watch Movie:`, from: 'MovieComponent',
          cost: cost
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        console.log('The dialog was closed' + result);
        this.dbService.addServiceIntoBillingModal(id, 'movie', title, cost)
          .then(response => {
            console.log(response);

            this.purchasedMovies.push(id);
            this.dbService.setStoreData('purchasedMovies', this.purchasedMovies);
            this.openVideoModal(id, title, releaseDate, videoList);
          });
      } else {
        console.log('The dialog was closed');

      }
    });
  }
  isMovieWatched(movieId) {
    return this.purchasedMovies.findIndex(mov => mov === movieId) > -1
      ? true : false;
  }
  openVideoModal(id, title, releaseDate, videoList) {



    console.log(id, title, releaseDate, JSON.stringify(videoList));



    const vid =
      videoList.map(el => {
        return new Video(el.type, el.size, el.name, el.key);
      });


    const dialogRef = this.dialog.open(PlayVideoComponent, {
      // width: '100%',       height: '250px',
      width: '81%',
      height: '77%',
      data: { title: title, videos: vid, releaseDate: releaseDate.split('-')[0] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

  }
}
