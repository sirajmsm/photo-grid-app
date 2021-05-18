import React from "react";
import { GridContextProvider, GridDropZone, GridItem } from "react-grid-dnd";
import "./style.css";
const PhotoGrid = (props) => {
  return (
    <GridContextProvider onChange={props.onChange}>
      <GridDropZone boxesPerRow={3} rowHeight={300} className="grid">
        {props.items.map((item) => (
          <GridItem key={item.id} className="grid-item">
            <div
              className="img-container"
              style={{
                backgroundImage: `url(${item.src})`,
                alignContent: "stretch",
              }}
            >
              <span className="img-label">{item.id}</span>
            </div>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
};

export default PhotoGrid;
