const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: "dmpysredc",
    api_key: "449484982239781",
    api_secret: "R8FQI2NdLexCnos63HqW2ag8BKo"
})

// Upload

uploadToCloudinary = (path, folder) => {
    return cloudinary.v2.uploader.upload(path, {
        folder
    }).then((data) => {
        return { url: data.url, public_id: data.public_id }
    }).catch((error) => {
        console.log(error)
    })
}

removeFromCloudinary = async (public_id) => {
    await cloudinary.v2.uploader.destroy(public_id, function (error, result) {
        console.log(result, error)
    })
}

module.exports = { uploadToCloudinary, removeFromCloudinary }