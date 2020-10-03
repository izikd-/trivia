import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GameState} from '../reducers/game.reducer';

export const gameFeatureName = 'game';

export const getGameFeatureState = createFeatureSelector(gameFeatureName);

export const selectPoints = createSelector(
  getGameFeatureState,
  (state: GameState) => state?.points
);
export const selectLives = createSelector(
  getGameFeatureState,
  (state: GameState) => state?.lives
);
export const selectProgress = createSelector(
  getGameFeatureState,
  (state: GameState) => state?.progress
);
export const selectQuestions = createSelector(
  getGameFeatureState,
  (state: GameState) => state?.questions
);
