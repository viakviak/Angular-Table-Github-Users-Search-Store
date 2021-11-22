import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { take } from 'rxjs/operators';
import { IApiGetUsersRequest, IUser } from 'src/app/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() per_page: number = 9;
  @Input() page: number = 1;
  @Output() onGetUsers = new EventEmitter();
  loginFormControl = new FormControl('', [Validators.required]);

  constructor(private searchService: SearchService) { }

  makeRequest() {
    console.log(this.loginFormControl.value);
    this.searchService.getUsers(this.loginFormControl.value, this.page, this.per_page)
      .pipe(take(1))
      .subscribe((response: IApiGetUsersRequest) => this.onGetUsers.emit(response));
  }

}
