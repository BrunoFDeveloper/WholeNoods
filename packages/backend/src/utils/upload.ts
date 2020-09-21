import cloudinary from "cloudinary";
import { FileUpload } from "graphql-upload";

// TODO:
// - Bucket by user ID
// - Add tags
// - Use mime library for resource types
// - Move secrets to better-named env variables
// - Take in an array of files.

export function upload(
  file: FileUpload
): Promise<cloudinary.UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        cloud_name: "wholenoods",
        api_key: "972146526542826",
        api_secret: process.env.CLOUDINARY_API_KEY,
        type: "private",
        // TODO: Use an actual mime library:
        resource_type: file.mimetype.startsWith("video/") ? "video" : "image",
      },
      (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      }
    );

    file.createReadStream().pipe(uploadStream);
  });
}
