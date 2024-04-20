import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";

const NotRecordingWebCam = ({ onStartRecording }) => {
  return (
    <div className=" flex justify-center items-center bg-primary text-zinc-400 rounded-3xl w-[800px]">
      <div className="flex flex-col justify-center">
        <p className="text-3xl font-bold">Press the button to start classifying objects</p>
        <button
          onClick={onStartRecording}
          className="bg-zinc-200 text-primary w-52 h-10 rounded-3xl mt-5 text-2xl mx-auto"
        >
          Start Recording
        </button>
      </div>
    </div>
  );
};

const WebcamRun = ({ onStopRecording }) => {
  const webcamRef = useRef(null);
  const intervalIdRef = useRef(null);

  const [predictions, setPredictions] = useState([]);

  const detectObject = async (model) => {
    const video = webcamRef.current.video;
    const newPredictions = await model.detect(video);
    setPredictions(newPredictions.filter((pred) => pred.score > 0.6));
  };

  useEffect(() => {
    const loadModelAndRunDetection = async () => {
      const model = await cocossd.load();
      intervalIdRef.current = setInterval(() => {
        detectObject(model);
      }, 50);
    };

    loadModelAndRunDetection();

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  });

  return (
    <div id="liveView" className="camView relative">
      <Webcam ref={webcamRef} />

      {predictions.map((pred, index) => (
        <div
          key={index}
          className="highlighter bg-green-600 bg-opacity-25 absolute z-10 border-dashed border"
          style={{ left: pred.bbox[0], top: pred.bbox[1], width: pred.bbox[2], height: pred.bbox[3] }}
        >
          <p className="p-1 absolute bg-orange-400 text-white text-sm z-20">
            {pred.class} - with {Math.round(pred.score * 100)}% confidence
          </p>
        </div>
      ))}

      <button
        onClick={onStopRecording}
        className="bg-primary text-white w-52 h-10 rounded-3xl mt-5 text-2xl absolute bottom-[-3px] left-[50%] translate-x-[-50%]"
      >
        Stop Recording
      </button>
    </div>
  );
};

const WebcamBlock = () => {
  const [capturing, setCapturing] = useState(false);

  return (
    <div className="p-3 rounded-3xl bg-white shadow-xl ring-1 ring-primary/5 ring-primary row-span-1 col-span-2 flex justify-center">
      {capturing && <WebcamRun onStopRecording={() => setCapturing(false)} />}
      {!capturing && <NotRecordingWebCam onStartRecording={() => setCapturing(true)} />}
    </div>
  );
};

export default WebcamBlock;
