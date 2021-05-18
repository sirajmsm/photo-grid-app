import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPhotos,
  getSelectedPhotos,
  addPhotos,
} from "../../redux/actions/photos";
import PhotoList from "../PhotoListComponent/PhotosList";
import PhotoGrid from "../PhotoGridComponent/PhotoGrid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";

const Photos = () => {
  const dispatch = useDispatch();
  const allPhotos = useSelector((state) => state.photos.photos);
  const selectedPhotos = useSelector((state) => state.photos.selectedPhotos);
  const user = useSelector((state) => state.photos.user);

  useEffect(() => {
    dispatch(getAllPhotos());
  }, []);

  const _onSelectImage = (index, image) => {
    let imgs = allPhotos;
    var img = imgs[index];
    if (selectedPhotos.length < 9) {
      if (img.hasOwnProperty("isSelected")) img.isSelected = !img.isSelected;
      else img.isSelected = true;
      let selectedImages = imgs.filter((img) => img.isSelected);
      dispatch(getSelectedPhotos(selectedImages));
      let favouritePhotos = {
        userId: user.id,
        favouritePhotos: selectedImages.map(img=>img.src),
      };
      dispatch(addPhotos(favouritePhotos));
    } else {
      const notify = () =>
        toast.error("Maximum Limit Exceed", { position: "top-center" });
      return notify();
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="navbar navbar-light bg-light">
            <span class="navbar-text heading-text">
              {selectedPhotos.length < 9
                ? `Please select your favourite ${
                    9 - selectedPhotos.length
                  } images.`
                : `Thank you for your selection.`}
            </span>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <PhotoList onSelectImage={_onSelectImage} images={allPhotos} />
        </div>
        <div
          class="col-10"
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          {selectedPhotos.length > 0 && <PhotoGrid items={selectedPhotos} />}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Photos;
