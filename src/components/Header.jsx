const Header = () => {
  return (
    <div className="p-8 rounded-3xl bg-white shadow-xl ring-1 ring-primary/5 ring-primary row-span-2 col-span-2">
      <h1 className="text-primary text-4xl font-bold">Object Recognition App</h1>
      <p className="mt-6 text-2xl">
        This web application allows you to upload photos from your device or record video from your webcam and shows you
        what objects are in the picture or video.
      </p>

      <p className="mt-6 text-2xl">
        This is Multiple object detection app using pre trained model in TensorFlow.js. This app uses a part of
        TensorFlow called COCO-SSD, which is very good at spotting different objects in pictures or videos. COCO-SSD can
        identify everyday objects quickly and with good accuracy, which means it can tell you a lot about a picture in
        just a few seconds.
      </p>

      <p className="mt-6 text-2xl">
        You can check COCO-SSD model here -{" "}
        <a href="https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd" className="text-blue-400">
          LINK
        </a>
      </p>
    </div>
  );
};

export default Header;
