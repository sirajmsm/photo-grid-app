import * as type from '../types';

export function getAllPhotos(photos) {
    return{
        type: type.GET_ALL_PHOTOS_REQUESTED,
        payload: photos,
    }
}

export function getSelectedPhotos(photos) {
    return{
        type: type.SELECT_PHOTO,
        payload: photos,
    }
}

export function addPhotos(photos) {
    return{
        type: type.ADD_PHOTOS_REQUESTED,
        payload: photos,
    }
}