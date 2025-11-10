import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("🧠 Received prompt:", prompt);

    // Send the user's prompt to Gemini
    const result = await chatSession.sendMessage(prompt);

    // Wait for model response
    const text = await result.response.text();
    console.log("🧾 Raw AI response text:", text);

    // Try parsing the AI's response
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("❌ Invalid JSON returned by AI:", text);
      return NextResponse.json(
        { error: "Invalid JSON returned by AI", raw: text },
        { status: 500 }
      );
    }

    // ✅ Normalize keys — always return { video_script: [...] }
    if (parsed.scenes && !parsed.video_script) {
      parsed = { video_script: parsed.scenes };
    }

    // ✅ If it's a plain array, wrap it in { video_script: [...] }
    if (Array.isArray(parsed)) {
      parsed = { video_script: parsed };
    }

    // ✅ Ensure we have the correct structure
    if (!parsed.video_script || !Array.isArray(parsed.video_script)) {
      return NextResponse.json(
        { error: "AI did not return a valid video_script structure", raw: parsed },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: parsed });
  } catch (e) {
    console.error("❌ Server error in /api/get-video-script:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
