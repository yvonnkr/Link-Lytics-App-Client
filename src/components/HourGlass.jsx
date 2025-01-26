import "react";
import { Hourglass } from "react-loader-spinner";

const HourGlass = ({ height, width }) => {
  return (
    <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
      <div className="flex flex-col items-center gap-1">
        <Hourglass
          visible={true}
          height={height ? height : "50"}
          width={width ? width : "50"}
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
        <p className="text-slate-700">Loading...</p>
        <p className="text-slate-700">Please Wait...</p>
      </div>
    </div>
  );
};
export default HourGlass;
