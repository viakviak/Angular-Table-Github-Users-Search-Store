import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/models';
import { IStateApp } from 'src/app/models/state.app';
import { IViewUserGrid } from 'src/app/models/view.user.grid';
import { selectSearchResponse } from 'src/app/store/search/search.selectors';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  private response$ = this.store.select(selectSearchResponse);
  userGrid$ = this.response$.pipe(map(response => <IViewUserGrid>{ users: new MatTableDataSource(response?.users), totalCount: response?.totalCount }));
  displayedColumns: string[] = ['avatar', 'login', 'type'];

  constructor(private store: Store<IStateApp>)
  {
  }
}
