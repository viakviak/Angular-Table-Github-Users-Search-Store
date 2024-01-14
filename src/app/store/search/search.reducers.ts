import { createReducer, on } from "@ngrx/store";
import { initialStateAppSearch } from "./initialize";
import { searchRequestAction, searchResponseAction } from "./search.actions";

export const searchReducers = createReducer(
    initialStateAppSearch,
    on(searchRequestAction, (state, action) => ({...state, request: action})),
    on(searchResponseAction, (state, action) => ({...state, response: action}))    
);