import { createAction, props } from "@ngrx/store";
import { ISearchRequest } from "src/app/models/search.request";
import { ISearchResponse } from "src/app/models/search.response";

export const searchRequestAction = createAction('[Search] Request', props<ISearchRequest>());
export const searchResponseAction = createAction('[Search] Response', props<ISearchResponse>());
