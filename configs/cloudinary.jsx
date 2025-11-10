import * as cloudinaryModule from 'cloudinary';

// Access the v2 object which contains the configuration and upload methods
const cloudinary = cloudinaryModule.v2;

// Configure Cloudinary using environment variables
// Note: This replaces the simple v2 import and config block you showed for audio
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a Base64 Data URI string to Cloudinary.
 * Used for images where direct Base64 upload is convenient.
 * @param {string} dataUri - The image data as a Base64 Data URI (e.g., 'data:image/png;base64,...').
 * @param {string} publicId - The unique identifier for the uploaded asset.
 * @returns {Promise<string>} The secure URL of the uploaded image.
 */
export async function uploadImageToCloudinary(dataUri, publicId) {
  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      public_id: publicId,
      resource_type: 'image', // Specify that this is an image
      folder: 'ai_generated_images', // Dedicated folder for generated images
      overwrite: true,
    });
    return result.secure_url; // Returns the permanent HTTPs URL
  } catch (error) {
    console.error("Cloudinary Image Upload Error:", error);
    throw new Error('Cloudinary image upload failed');
  }
}

/**
 * Upload any media (audio, video, image) to Cloudinary using streams.
 * @param {Buffer} buffer - File buffer
 * @param {string} publicId - Cloudinary public ID (e.g., `audio/myfile`)
 * @param {'image' | 'video' | 'raw'} resourceType - Type of file
 * @returns {Promise<string>} Cloudinary URL
 */
export const uploadMediaToCloudinary = async (buffer, publicId, resourceType = 'raw') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: 'AI short video generator', // Using your existing folder name
        public_id: publicId,
        format: resourceType === 'image' ? 'png' : resourceType === 'video' ? 'mp4' : 'mp3',
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    ).end(buffer);
  });
};
