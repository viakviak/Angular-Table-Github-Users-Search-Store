import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/app/models';
import { SearchService } from 'src/app/services/search.service';

import { ResultsComponent } from './results.component';

fdescribe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule
      ],
      providers: [SearchService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    searchService = TestBed.inject(SearchService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create results component', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully subscribe to observables from search service on ngOnInit', () => {
    let users: IUser[] = [];
    let resultsLength = 0;
    let isLoadingResults = false;
    let overlayText = 'No Results';

    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(users);
    expect(component.resultsLength).toEqual(resultsLength);
    expect(component.isLoadingResults).toEqual(isLoadingResults);
    expect(component.overlayText).toEqual(overlayText);
  })
});
