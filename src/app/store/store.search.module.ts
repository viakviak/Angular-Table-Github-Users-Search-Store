import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { searchReducers } from "./search/search.reducers";
import { StoreModule } from "@ngrx/store";
import { SearchEffects } from "./search/search.effects";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('search', searchReducers),
        EffectsModule.forFeature([SearchEffects]),
    ]
})
export class StoreSearchModule {}