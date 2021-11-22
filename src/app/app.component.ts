import { Component } from '@angular/core';
import { IApiGetUsersRequest, IUser } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  apiResponse!: IApiGetUsersRequest;

  onGetUsers(response: IApiGetUsersRequest){
    this.apiResponse = response;
  }
}
