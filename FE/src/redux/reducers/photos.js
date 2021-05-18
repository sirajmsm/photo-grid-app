import * as type from "../types";

const initialState = {
  photos: [],
  selectedPhotos: [],
  loading: false,
  error: null,
  user: {},
};

export default function photos(state = initialState, action) {
  switch (action.type) {
    case type.GET_ALL_PHOTOS_REQUESTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case type.GET_ALL_PHOTOS_SUCCESS: {
      let data =
        action.photos &&
        action.photos.entries.map((entry, id) => {
          let obj = {
            src: entry.picture,
            isSelected: false,
            thumbnail: entry.picture,
            order: id,
            timestamp: entry.timestamp,
            thumbnailWidth: 5,
            thumbnailHeight: 5,
          };
          return obj;
        });
      return {
        ...state,
        loading: false,
        photos: data.length > 0 && data,
        user: action.photos.author,
      };
    }
    case type.GET_ALL_PHOTOS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    }

    case type.SELECT_PHOTO: {
      return {
        ...state,
        selectedPhotos: action.payload,
      };
    }

    case type.ADD_PHOTOS_REQUESTED: {
      return {
        ...state,
        loading: true,
      };
    }

    case type.ADD_PHOTOS_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case type.ADD_PHOTOS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    }
    default:
      return state;
  }
}
