import axios from "axios";
// We removed 'fs' and 'path' because we no longer save to the local disk.
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from 'next/server'; // Recommended for Next.js App Router responses

// Assuming this helper function is located in your configs folder
import { uploadImageToCloudinary } from '@/configs/cloudinary'; 

// API route handler (compatible with Next.js App Router)
export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      // Using NextResponse.json is standard for App Router API responses
      return NextResponse.json(
        { error: "Prompt is required" }, 
        { status: 400 }
      );
    }

    // Use SDXL-base model endpoint from Hugging Face
    const hfApiUrl = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";

    const hfResponse = await axios.post(
      hfApiUrl,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          Accept: "image/png",
        },
        responseType: "arraybuffer",
        timeout: 60000,
      }
    );

    // Convert image buffer from HF API response
    const buffer = Buffer.from(hfResponse.data);

    // --- START CLOUDINARY LOGIC ---
    
    // 1. Generate a unique ID (optional prefix for folder structure in Cloudinary)
    const publicId = `ai_image_${uuidv4()}`;
    
    // 2. Convert Buffer to Base64 Data URI. Cloudinary prefers this format for upload.
    const base64Image = buffer.toString('base64');
    const dataUri = `data:image/png;base64,${base64Image}`;

    // 3. Upload the Base64 Data URI to Cloudinary
    const imageUrl = await uploadImageToCloudinary(dataUri, publicId);
    
    // --- END CLOUDINARY LOGIC ---

    // Respond with the permanent Cloudinary image URL
    return NextResponse.json({ imageUrl }, {
      status: 200,
    });

  } catch (error) {
    // Attempt to decode buffer errors
    let errorDetails = error.response?.data;
    if (Buffer.isBuffer(errorDetails)) {
      try {
        errorDetails = errorDetails.toString("utf-8");
      } catch (_) {
        errorDetails = "Unknown binary error";
      }
    }
    
    const details = errorDetails || error.message;

    console.error("Image generation error:", details);

    return NextResponse.json(
      {
        error: "Image generation failed",
        details: typeof details === 'object' ? JSON.stringify(details) : details || "Unknown error",
      },
      { status: 500 }
    );
  }
}
