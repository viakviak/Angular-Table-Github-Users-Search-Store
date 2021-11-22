import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IApiGetUsersRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private reqPath = "search/users";

  constructor(private http: HttpClient) { }

  getUsers(query: string, page: number, per_page: number): Observable<IApiGetUsersRequest> {
    return this.http.get<IApiGetUsersRequest>(this.createUrl(query, page, per_page));
  }

  private createUrl(query: string, page: number, per_page: number): string {
    return `${environment.apiBaseUrl}${this.reqPath}?q=${query}&page=${page || 1}&per_page=${per_page}`;
  }
}
