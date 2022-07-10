import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TodoEffects } from './todos.effects';
import { todosFeature } from "./todos.reducer";

@NgModule({
	imports: [
		StoreModule.forFeature(todosFeature),
		EffectsModule.forFeature([TodoEffects])
	],
})
export class TodosFeatureModule {
}
