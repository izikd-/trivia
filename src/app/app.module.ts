import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {Route, RouterModule} from '@angular/router';
import {BoardComponent} from './trivia/board/board.component';
import {QuestionComponent} from './trivia/board/question/question.component';
import {HttpClientModule} from '@angular/common/http';
import {appEffects, appReducer} from './store/app.states';
import {BtnComponent} from './trivia/shared/components/btn/btn.component';
import {GameOverComponent} from './trivia/board/game-over/game-over.component';
import {LeaderboardComponent} from './trivia/leaderboard/leaderboard.component';
import {LoadingComponent} from './trivia/shared/components/loading/loading.component';

const ROUTES: Route[] = [
  {path: '', component: LeaderboardComponent},
  {path: 'trivia', pathMatch: 'full', component: BoardComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    QuestionComponent,
    BtnComponent,
    GameOverComponent,
    LeaderboardComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
