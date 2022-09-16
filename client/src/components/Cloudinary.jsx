import React from "react";
import { useState } from "react";

function Cloudinary({ setCloudinary }) {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    console.log(data);
    data.append("file", files[0]);
    data.append("upload_preset", "FolderPrueba");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqut4ajgf/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(res);
    setImage(file.secure_url);
    console.log(file.public_id);
    console.log(file.secure_url);
    setLoading(false);
    const cloudinary = { public_id: file.public_id, url: file.secure_url };
    setCloudinary(cloudinary);
  };

  return (
    <div className="flex justify-center items-center">
      {/* <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ">
        <a href="#">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Cloudinary
          </h1>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <input
          type="file"
          name="file"
          placeholder="Sube tu imagen aquí"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onChange={uploadImage}
        />
        {loading ? <h3>Loading Images...</h3> : <img src={image} width="300" />}
      </div> */}
      <input type="file" />
    </div>
  );
}

export default Cloudinary;
