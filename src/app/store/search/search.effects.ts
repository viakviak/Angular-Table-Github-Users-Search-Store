import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SearchService } from "src/app/services/search.service";
import { searchRequestAction, searchResponseAction } from "./search.actions";
import { auditTime, switchMap, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";

@Injectable()
export class SearchEffects {
    constructor(private actions$: Actions, private searchService: SearchService, private store: Store)
    {
    }

    response$ = createEffect(() =>
        this.actions$.pipe(
            ofType(searchRequestAction),
            auditTime(0),
            switchMap(request =>
                this.searchService.searchUsers(request.query, request.page)
                .pipe(
                    tap(response => this.store.dispatch(searchResponseAction(response)))
                )
            )
        ), {dispatch: false})
}