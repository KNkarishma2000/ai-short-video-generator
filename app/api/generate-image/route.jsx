import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// API route handler (compatible with Next.js API routes or Express with minor edits)
export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
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

    // Generate file path and save
    const filename = `${uuidv4()}.png`;
    const outputDir = path.join(process.cwd(), "public", "generated");
    await fs.mkdir(outputDir, { recursive: true }); // Ensure dir exists
    const filepath = path.join(outputDir, filename);
    await fs.writeFile(filepath, buffer);

    // Respond with image URL
    const imageUrl = `/generated/${filename}`;
    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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

    console.error("Image generation error:", errorDetails || error.message);

    return new Response(
      JSON.stringify({
        error: "Image generation failed",
        details: errorDetails || error.message || "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
