import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IStateAppSearch } from "src/app/models/state.app.search";

export const featureName = "search";
export const selectSearch = createFeatureSelector<IStateAppSearch>(featureName);
export const selectSearchRequest = createSelector(selectSearch, state => state?.request);
export const selectSearchResponse = createSelector(selectSearch, state => state?.response);