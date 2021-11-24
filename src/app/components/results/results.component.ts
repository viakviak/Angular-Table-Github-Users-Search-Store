import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/models';

import { SearchService } from 'src/app/services/search.service';
import { BaseComponentOnDestroy } from 'src/app/epics/base-component-on-destroy';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent extends BaseComponentOnDestroy implements OnInit, AfterViewInit {

  dataSource: MatTableDataSource<IUser> = new MatTableDataSource();
  displayedColumns: string[] = ['avatar', 'login', 'type'];

  resultsLength = 0;
  isLoadingResults = true;

  overlayText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit() {
    this.searchService.loading$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((loading: boolean) => this.isLoadingResults = loading);

    this.searchService.totalCount$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((count: number) => this.resultsLength = count);

    this.searchService.users$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((users: IUser[]) => this.dataSource.data = users);

    this.searchService.newSearch$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((newSearch: boolean) => {
        if (!!newSearch && this.paginator) {
          this.paginator.firstPage();
        }
      });

    this.searchService.overlayText$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(txt => this.overlayText = txt);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.paginator.page
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe((paginator) => this.searchService.moveToPage(++paginator.pageIndex));
  }

}
