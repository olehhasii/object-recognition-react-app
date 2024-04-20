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
  /* const [detectedObjects, setDetectedObjects] = useState([]);
   */
  const webcamRef = useRef(null);

  const runMode = async () => {
    const model = await cocossd.load();
    console.log("net is running");
    console.log(model);

    setInterval(() => {
      detectObject(model);
    }, 1000);
  };

  const detectObject = async (model) => {
    const video = webcamRef.current.video;
    const predictions = await model.detect(video);
    /* setDetectedObjects(predictions);
    console.log(detectedObjects); */

    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      if (predictions[n].score > 0.66) {
        const p = document.createElement("p");
        p.innerText =
          predictions[n].class + " - with " + Math.round(parseFloat(predictions[n].score) * 100) + "% confidence.";
        p.style =
          "margin-left: " +
          predictions[n].bbox[0] +
          "px; margin-top: " +
          (predictions[n].bbox[1] - 10) +
          "px; width: " +
          (predictions[n].bbox[2] - 10) +
          "px; top: 0; left: 0;";

        const highlighter = document.createElement("div");
        highlighter.setAttribute("class", "highlighter");
        highlighter.style =
          "left: " +
          predictions[n].bbox[0] +
          "px; top: " +
          predictions[n].bbox[1] +
          "px; width: " +
          predictions[n].bbox[2] +
          "px; height: " +
          predictions[n].bbox[3] +
          "px;";

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);
      }
    }
  };

  useEffect(() => {
    runMode();
  }, []);

  return (
    <div>
      <Webcam ref={webcamRef} />
      <button onClick={onStopRecording}>Stop Recording</button>
    </div>
  );
};

const WebcamBlock = () => {
  const [capturing, setCapturing] = useState(false);

  return (
    <div className="p-8 rounded-3xl bg-white shadow-xl ring-1 ring-primary/5 ring-primary row-span-1 col-span-2 flex justify-center">
      {capturing && <WebcamRun onStopRecording={() => setCapturing(false)} />}
      {!capturing && <NotRecordingWebCam onStartRecording={() => setCapturing(true)} />}
    </div>
  );
};

export default WebcamBlock;
