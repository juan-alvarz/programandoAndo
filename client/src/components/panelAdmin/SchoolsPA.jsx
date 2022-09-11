import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Select from "react-select";

function CoursesPA() {
  const [selectedOptions, setSelectedOptions] = useState();

  const optionList = []?.map((video) => {
    // return {
    //   value: video._id,
    //   label: video.name,
    // };
  });

  function handleSelect(data) {
    setSelectedOptions(data);
  }
  return (
    <div className="text-2x1 font-semibold flex h-screen">
      <Sidebar />
      <div className="w-full h-full" style={{ backgroundColor: "#C9C4B8" }}>
        <div className="h-screen">
          <form
            className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
            action=""
          >
            <h2 className="text-gray-700 font-bold py-2 text-center text-xl">
              Create School
            </h2>
            <label className="text-gray-700 font-bold py-2" for="">
              Name
            </label>
            <input
              className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
              type="text"
              placeholder="Name"
            />
            <label className="text-gray-700 font-bold py-2" for="">
              Description
            </label>
            <textarea
              className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
              placeholder="Description"
            />
            <label className="text-gray-700 font-bold py-2" for="">
              Image school
            </label>
            <input
              className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
              type="text"
              placeholder="Image"
            />
            <label className="text-gray-700 font-bold py-2" for="">
              courses
            </label>
            <Select
              options={optionList}
              placeholder="Videos"
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
            />
            <div className="flex justify-end items-center my-4 mt-10">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4 ">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CoursesPA;
