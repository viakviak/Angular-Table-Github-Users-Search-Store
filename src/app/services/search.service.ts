import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApiGetUsersRequest, IUser } from '../models';

@Injectable()
export class SearchService {

  private reqPath = "search/users";
  private currentQuery: string = '';
  private currentPage: number = 1;

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private newSearchSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  newSearch$: Observable<boolean> = this.newSearchSubject.asObservable();

  private totalCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalCount$: Observable<number> = this.totalCountSubject.asObservable();

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  private overlayTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('No List');
  overlayText$: Observable<string> = this.overlayTextSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(query: string, page?: number) {
    this.loadingSubject.next(true);
    this.currentQuery = query;
    this.currentPage = page ? page : 1;

    this.http
      .get<IApiGetUsersRequest>(encodeURI(`${environment.apiBaseUrl}${this.reqPath}?q=${this.currentQuery}&page=${this.currentPage}&per_page=9`))
      .pipe(
        catchError(error => {
          this.usersSubject.next([])
          this.overlayTextSubject.next((error instanceof HttpErrorResponse) ? error.error.message : error.message)
          return of({} as IApiGetUsersRequest);
        })
      )
      .subscribe(
        (data: IApiGetUsersRequest) => {
          if (data.items) {
            this.usersSubject.next(data.items);
            this.totalCountSubject.next(data.total_count);
            this.newSearchSubject.next(!page);
            this.overlayTextSubject.next(data.items.length ? '' : 'No List Found');
          }
          this.loadingSubject.next(false)
        })
  }

  moveToPage(page: number) {
    this.getUsers(this.currentQuery, page);
  }
}
