import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import * as Components from './components';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchService } from './services/search.service';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let componentNativeElement: HTMLElement;
  let componentInstance: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        Components.SearchComponent,
        Components.ListComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AppRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule
      ],
      providers: [SearchService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
    componentNativeElement = fixture.nativeElement as HTMLElement;
  })

  it('should create the app', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should render main heading title', () => {
    fixture.detectChanges();
    expect(componentNativeElement.querySelector('#heading')?.textContent).toContain('User List');
  });

  it('should have search and list component', () => {
    fixture.detectChanges();
    expect(componentNativeElement.querySelector('app-search')).toBeTruthy();
    expect(componentNativeElement.querySelector('app-list')).toBeTruthy();
  });
});
