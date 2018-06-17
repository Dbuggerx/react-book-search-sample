import { combineEpics } from 'redux-observable';
import { epics } from './books';

export default combineEpics(epics);
