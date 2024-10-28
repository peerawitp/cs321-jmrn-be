import { v2 as cloudinary } from "cloudinary";

export enum ImageType {
  SLIP = "slip",
  PRODUCT = "product",
}

const uploadFile = async (file: File, type: ImageType) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const generatedFileName = `${Date.now()}_` + type;
  const fileExtension = file.toString().split(".").pop();

  const tmpPath = "/tmp/" + type;
  const filePath = tmpPath + generatedFileName + "." + fileExtension;
  await Bun.write(filePath, file);

  const result = await cloudinary.uploader.upload(filePath, {
    folder: type,
    public_id: generatedFileName,
  });

  if (!result) {
    throw new Error("Failed to upload file");
  }

  const optimizedUrl = cloudinary.url(result.public_id, {
    secure: true,
    quality: "auto",
    fetch_format: "auto",
  });

  if (!optimizedUrl) {
    throw new Error("Failed to optimize image file");
  }

  return optimizedUrl;
};

export default {
  uploadFile,
};
