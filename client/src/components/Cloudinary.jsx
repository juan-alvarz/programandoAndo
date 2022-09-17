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
    <div className="flex items-center justify-center">
      <label
        htmlFor="upload"
        className="cursor-pointer hover:text-blue-500 absolute left-45 top-12 text-yellow-700"
      >
        <span className="glyphicon glyphicon-folder-open" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 "
          >
            <path d="M4.75 3A1.75 1.75 0 003 4.75v2.752l.104-.002h13.792c.035 0 .07 0 .104.002V6.75A1.75 1.75 0 0015.25 5h-3.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H4.75zM3.104 9a1.75 1.75 0 00-1.673 2.265l1.385 4.5A1.75 1.75 0 004.488 17h11.023a1.75 1.75 0 001.673-1.235l1.384-4.5A1.75 1.75 0 0016.896 9H3.104z" />
          </svg>
        </span>
        <input
          type="file"
          name="file"
          id="upload"
          style={{ display: "none" }}
          onChange={uploadImage}
        />
      </label>
    </div>
  );
}

export default Cloudinary;
