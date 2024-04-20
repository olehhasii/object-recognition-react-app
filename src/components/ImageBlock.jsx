import { useRef, useState } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs"; // Import TensorFlow.js

const ImageBlock = () => {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const runDetection = async () => {
    const img = imageRef.current;
    const model = await cocossd.load();
    const predictions = await model.detect(img);
    setPredictions(predictions.filter((pred) => pred.score > 0.6));
  };

  return (
    <div className="p-3 rounded-3xl bg-white shadow-xl ring-1 ring-primary/5 ring-primary row-span-1 col-span-2 flex gap-7 ">
      <div className="flex flex-col justify-center gap-5">
        <h3 className="text-2xl font-bold">Load Photo to classify</h3>
        <input type="file" onChange={handleImageUpload} accept="image/*" />
      </div>
      <div className="my-4 max-h-full relative">
        {image && (
          <img
            src={image}
            alt="Upload Preview"
            ref={imageRef}
            crossOrigin="anonymous"
            onLoad={runDetection}
            className="max-h-full"
          />
        )}
        {image &&
          predictions.map((pred, index) => (
            <div
              key={index}
              className="highlighter bg-green-600 bg-opacity-25 absolute z-10 border-dashed border"
              style={{
                left: `${pred.bbox[0]}px`,
                top: `${pred.bbox[1]}px`,
                width: `${pred.bbox[2]}px`,
                height: `${pred.bbox[3]}px`,
              }}
            >
              <p className="p-1 absolute bg-orange-400 text-white text-sm z-20">
                {pred.class} - {Math.round(pred.score * 100)}%
              </p>
            </div>
          ))}
      </div>
      <div className="relative"></div>
    </div>
  );
};

export default ImageBlock;
