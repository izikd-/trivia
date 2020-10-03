import {GameReducer} from './reducers/game.reducer';
import {GameEffects} from './effects/game.effects';

export const appReducer = {
  game: GameReducer,
};

export const appEffects = [GameEffects];
