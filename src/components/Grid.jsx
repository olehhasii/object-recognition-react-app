import Header from "./Header";
import WebcamBlock from "./WebcamBlock";

const Grid = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-4 h-full w-full gap-4">
      <Header />
      <WebcamBlock />
    </div>
  );
};

export default Grid;
