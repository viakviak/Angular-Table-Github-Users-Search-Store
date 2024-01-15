import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ISearchRequest } from 'src/app/models/search.request';
import { IStateApp } from 'src/app/models/state.app';
import { searchRequestAction } from 'src/app/store/search/search.actions';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  userFormControl = new FormControl('', [Validators.required]);

  constructor(private store: Store<IStateApp>, private searchService: SearchService) { }

  makeRequest() {
    this.searchService.getUsers(this.userFormControl.value ?? '');
    this.store.dispatch(searchRequestAction(<ISearchRequest> {
      query: this.userFormControl.value ?? ''
    }))
  }
}
