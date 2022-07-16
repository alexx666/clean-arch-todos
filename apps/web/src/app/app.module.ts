import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TodosComponent } from './todos/component/todos.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TodosFeatureModule } from './todos/state/todos.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';


@NgModule({
	declarations: [
		AppComponent,
		TodosComponent,
	],
	imports: [
		MaterialModule,
		BrowserModule,
		RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
		HttpClientModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot(),
		TodosFeatureModule,
		StoreDevtoolsModule.instrument(),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
