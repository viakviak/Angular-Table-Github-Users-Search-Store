import { ISearchRequest } from "./search.request";
import { ISearchResponse } from "./search.response";

export interface IStateAppSearch {
    request?: ISearchRequest;
    response?: ISearchResponse;
}