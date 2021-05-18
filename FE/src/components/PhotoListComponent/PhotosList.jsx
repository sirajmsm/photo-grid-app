import React from "react";
import Gallery from "react-grid-gallery";
import "./style.css";
const PhotosList = (props) => {
  
  return (
    <div className="photo-list">
      <Gallery
        images={props.images}
        onSelectImage={props.onSelectImage}
        rowHeight={100}
      />
    </div>
  );
};

export default PhotosList;
