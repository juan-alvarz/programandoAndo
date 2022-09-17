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
      <input
        type="file"
        name="file"
        placeholder="Sube tu imagen aquí"
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onChange={uploadImage}
      />
      {loading ? <h3>Loading Images...</h3> : <img src={image} width="300" />}
    </div>
  );
}

export default Cloudinary;
