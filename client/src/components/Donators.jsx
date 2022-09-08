import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVideos } from "../redux/actions";

function Donators() {
  // const { videos } = useSelector((state) => state.programandoando);
  // const dispatch = useDispatch();
  // console.log(videos);

  // useEffect(() => {
  //   dispatch(getAllVideos());
  // }, [dispatch]);

  return (
    <div>
      <div className="w-full h-full" style={{ backgroundColor: "#C9C4B8" }}>
        <div className="h-screen">
          <form
            className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
            action=""
          >
            <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
              Donation
            </h2>
            <label className="text-gray-700 font-bold py-2" for=""></label>
            <input
              className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
              type="number"
              placeholder="Donation $ 0.000"
            />

            <div className="flex justify-center items-center my-4 mt-10">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 ">
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Donators;
