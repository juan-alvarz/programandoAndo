const {v2} = require("cloudinary");
// import {v2 as cloudinary} from 'cloudinary'
const{
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} = require("./cloudinarycredentials")

v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure : true
})

const uploadImage = async (filePath) =>{
    return await v2.uploader.upload(filePath,{
        folder: "PF"
    })
}

const deleteImage = async (publicId) =>{
    return await v2.uploader.destroy(publicId)
}

module.exports = {uploadImage,deleteImage}