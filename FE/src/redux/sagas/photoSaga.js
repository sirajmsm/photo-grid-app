import { call, put, takeEvery } from "redux-saga/effects";
import { getAllPhotosApi, addPhotosApi } from "../../services/api";

function getAllPhotosData() {
  return fetch(getAllPhotosApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function AddSelectedPhotosData(data) {
  return fetch(addPhotosApi, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function* addSelectedPhotos(action) {
  try {
    yield call(AddSelectedPhotosData(action.payload));
    yield put({ type: "ADD_PHOTOS_SUCCESS" });
  } catch (e) {
    yield put({ type: "ADD_PHOTOS_FAILED", message: e.message });
  }
}

function* getAllPhotos(action) {
  try {
    const photos = yield call(getAllPhotosData);
    yield put({ type: "GET_ALL_PHOTOS_SUCCESS", photos: photos });
  } catch (e) {
    yield put({ type: "GET_ALL_PHOTOS_FAILED", message: e.message });
  }
}

function* photoSaga() {
  yield takeEvery("GET_ALL_PHOTOS_REQUESTED", getAllPhotos);
  yield takeEvery("ADD_PHOTOS_REQUESTED", addSelectedPhotos);
}

export default photoSaga;
