import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ISearchResponse } from '../models/search.response';
import { IApiGetUsersRequest } from '../models';

describe('SearchService', () => {
  let test: SearchService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        SearchService,
        HttpClient,
      ]
    });

    test = TestBed.inject(SearchService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpController.verify();
  });

  it('should be created', () => {
    expect(test).toBeTruthy();
  });

  describe('should trigger searchUsers call', () => {
    it('should get successful result', () => {
      const query = 'some-query';
      const page = 2;
      let response: ISearchResponse = {};
      const mockResponse = <IApiGetUsersRequest>{items: [{ id: 1001, login: 'user1001' }, { id: 1002, login: 'user1002' }], total_count: 2, incomplete_list: false};
      const expectedResponse = <ISearchResponse>{users: [{ id: 1001, login: 'user1001' }, { id: 1002, login: 'user1002' }], totalCount: 2, isListIncomplete: false};
  
      test.searchUsers(query, page)
      .subscribe(r => response = r);
  
      const request = httpController.expectOne(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=9`);
      expect(request.request.method).toEqual('GET');
  
      request.flush(mockResponse);
      expect(response).toEqual(expectedResponse);
    });  

    it('should get error result', () => {
      const query = 'some-query';
      const page = 2;
      let response: ISearchResponse = {};
  
      test.searchUsers(query, page)
      .subscribe(r => response = r);
  
      const request = httpController.expectOne(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=9`);
      expect(request.request.method).toEqual('GET');
  
      request.flush('some error', { status: 404, statusText: 'Not Found' });
      expect(response.error).toContain('404');
      expect(response.users).toBeFalsy();
      expect(response.totalCount).toBeFalsy();
      expect(response.isListIncomplete).toBeFalsy();
    });  
  });
});
