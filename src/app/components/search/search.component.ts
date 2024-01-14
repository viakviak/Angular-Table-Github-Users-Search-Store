import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  userFormControl = new FormControl('', [Validators.required]);

  constructor(private searchService: SearchService) { }

  makeRequest() {
    this.searchService.getUsers(this.userFormControl.value ?? '');
  }
}
