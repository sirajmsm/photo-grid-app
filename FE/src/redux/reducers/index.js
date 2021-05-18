import { combineReducers } from 'redux';
import photos from './photos';

const rootReducer = combineReducers({
    photos: photos,

});

export default rootReducer;