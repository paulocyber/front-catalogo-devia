import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import "./ImagemPop.css";

const ImagePop = ({ produtoImagem }) => {
  return (
    <TransformWrapper
      options={{
        disableRotation: true,
        pan: false,
      }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools fixed top-4 right-4 z-20">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
              onClick={() => zoomIn()}
            >
              +
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10"
              onClick={() => zoomOut()}
            >
              -
            </button>

            {/* <button onClick={() => resetTransform()}>x</button>  */}
          </div>
          <TransformComponent>
            <img className="produtos_imagens" src={produtoImagem} alt="" />
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
    /*  <div>
             <img className="h-auto max-w-full rounded-lg" src={produtoImagem} alt=""></img>
         </div> */
  );
};

export default ImagePop;
