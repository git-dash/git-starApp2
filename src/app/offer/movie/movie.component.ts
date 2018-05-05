import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../../shared/shared-services/movie.service';
import { Observable } from 'rxjs/Observable';
import { Movie, SearchedMovie } from '../../entity/movie';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms/';
// import { do } 'rxjs/add/operator';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';

// import { startWith } from 'rxjs/operators';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  currentPage = 0;
  total_pages = 0;
  searchMovie: string = null;
  firstTime = true;
  sample$: Observable<SearchedMovie>;

  subscriptionList = new Subscription();
  sample: SearchedMovie;
  searchField: FormControl;

  constructor(private movieService: MovieService, private changeDetector: ChangeDetectorRef) { }

  // datatable attributes
  resultsLength = 0;
  isLoadingResults = true;
  displayedColumns = ['id'];
  dataSource$ = new MatTableDataSource();
  @ViewChild('currentPaginator') currentPaginator: MatPaginator;

  ngOnInit() {

    this.searchField = new FormControl();



    this.sample$ =
      this.searchField.valueChanges
        .startWith(null)
        .debounceTime(400)
        .distinctUntilChanged()
        .do(() => {
          this.isLoadingResults = true;
          this.currentPage = 0;
          this.total_pages = 0;
        })
        .switchMap(term => {
          return this.movieService.getMovieList(term, 1);
        })
        .do((list) => {
          this.isLoadingResults = false;
          this.dataSource$.data = list.results;
          this.currentPage = list.page;
          this.total_pages = list.total_pages;
          if (this.currentPaginator === undefined) {

            setTimeout(() => {
              this.changeDetector.detectChanges();
              this.dataSource$.paginator = this.currentPaginator;
            }, true);
          }
        });


    /*
// const test
//   = this.movieService.getMovieList().subscribe(resp => {
  //     console.log(resp);
  //     this.sample = resp;
  //   });

  // this.sample$ =
  //   this.movieService.getObservableMovieList();


  // this.movieService.getObservableMovieList()
  //   .subscribe(resp => {

    //     this.dataSource$.data = resp;
    //     this.dataSource$.paginator = this.paginator;
    //   });

    */

    // this.getMovieList(this.searchField.value, 1);

    // this.searchField.patchValue(
    //   'popular'
    // );

  }




  getMovieList(movieName, pageIndex) {

    // this.subscriptionList = this.movieService.getMovieList(movieName, pageIndex)
    //   .subscribe(list => {
    //     this.firstTime = false;
    //     this.isLoadingResults = false;
    //     this.sample = list;
    //     this.dataSource$.data = list.results;
    //     this.changeDetector.detectChanges();
    //     this.dataSource$.paginator = this.currentPaginator;
    //   });

    this.isLoadingResults = true;
    this.sample$ = this.movieService.getMovieList(movieName, pageIndex)
      .do(list => {

        this.dataSource$.data = list.results;
        this.dataSource$.paginator = this.currentPaginator;
        this.changeDetector.detectChanges();
        this.dataSource$.paginator = this.currentPaginator;
        this.isLoadingResults = false;
      });


  }
  getObservableDataSource() {

    const element_data = [

      { id: 1, name: 'Hydrogen', progress: 1.0079, color: 'H' },
      { id: 2, name: 'Helium', progress: 4.0026, color: 'He' },
      { id: 3, name: 'Lithium', progress: 6.941, color: 'Li' },
      { id: 4, name: 'Beryllium', progress: 9.0122, color: 'Be' },
      { id: 5, name: 'Boron', progress: 10.811, color: 'B' },
      { id: 6, name: 'Thomas', progress: 25.811, color: 'G' },

    ];



    this.movieService.getObservableDataSource(this.currentPaginator.page, this.firstTime, this.dataSource$.filter)
      .subscribe(response => {
        console.log(response);
        this.dataSource$ = response;
      });
  }

  getNewList(isNext: boolean) {

    this.sample$ =
      this.searchField.valueChanges
        .startWith(this.searchField.value)
        .debounceTime(400)
        .distinctUntilChanged()
        .do(() => {
        this.isLoadingResults = true;
          this.currentPage = 1;
          this.total_pages = 1;
        })
        .switchMap(term => {
          return this.movieService.getMovieList(term, (isNext ? this.currentPage + 1 : this.currentPage - 1));
        })
        .do((list) => {
          this.isLoadingResults = false;
          this.dataSource$.data = list.results;
          this.currentPage = list.page;
          this.total_pages = list.total_pages;
          if (this.currentPaginator === undefined) {

            setTimeout(() => {
              this.changeDetector.detectChanges();
              this.dataSource$.paginator = this.currentPaginator;
            }, true);
          }
        });

    console.log(this.currentPaginator);

  }


}
