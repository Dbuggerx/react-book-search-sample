import { combineEpics } from 'redux-observable';
import { epics } from './search';

export default combineEpics(epics);
