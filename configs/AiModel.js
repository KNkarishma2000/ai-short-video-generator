const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


 export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `write a script to generate 30 seconds video on topic:interesting historical story with ai image prompt with realistic format for each scene and give me the result in json format with image prompt and content text as field`,
          },
        ],
      },
        {
      role: 'model',
      parts: [
        {
          text: `Here's a breakdown of the thought process to generate the video script JSON:


    *   **Output:** 30-second video script.
    *   **Format:** JSON.
    *   **Key Fields:** \`image_prompt\` (realistic format), \`content_text\` (narration/text on screen).
    *   **AI Image Prompt:** Must be suitable for realistic image generation.
    *   **Duration:** 30 seconds. This is crucial for pacing.


    *   Should have visually interesting elements.
    *   Needs a clear beginning, middle, and end (even if simplified).
    *   Initial ideas:
        *   The Trojan Horse (too complex for 30s, many scenes).
        *   Archimedes' "Eureka!" moment (good, visual, but maybe too short).
        *   The Library of Alexandria (good, visually rich, potential for a poignant ending).
        *   Cleopatra's meeting with Caesar (intriguing, visually distinct).
        *   **The Great Emu War (Australia):** This is a quirky, lesser-known, and visually distinct story. It's absurd, which can be engaging. It also has a clear conflict and outcome. This seems like a good candidate for a short, interesting piece.


    *   **Scene 1: Introduction/Setting the Scene.**
    *   **Scene 2: The Problem.**
    *   **Scene 3: The "Solution" (Military Intervention).**
    *   **Scene 4: The Conflict (Emus vs. Soldiers).**
    *   **Scene 5: The Outcome/Humor.**
    *   **Scene 6: Concluding thought/Call to action (optional, but good for engagement).**


    *   **Scene 1: Introduction**
        *   *Story:* Post-WWI Australia, farmers struggling.
        *   *Visual:* Sun-drenched wheat fields, perhaps a lone farmer.
        *   *Narration:* "1932, Western Australia. Farmers faced a new enemy..."
        *   *Image Prompt Idea:* \`Realistic photograph, 1930s Australian outback, vast golden wheat fields under a harsh sun, a lone farmer in period clothing looking distressed. Dust in the air. Cinematic lighting.\`

    *   **Scene 2: The Problem**
        *   *Story:* Emus migrating and destroying crops.
        *   *Visual:* A large flock of emus overwhelming a field.
        *   *Narration:* "...not drought, but thousands of emus, devouring their crops."
        *   *Image Prompt Idea:* \`Realistic photograph, eye-level shot, a massive flock of emus charging through a wheat field, kicking up dust. Some emus actively eating crops. Focus on the chaos and number of birds. 1930s setting.\`

    *   **Scene 3: The "Solution"**
        *   *Story:* Government sends in soldiers with machine guns.
        *   *Visual:* Soldiers with Lewis guns, looking determined, perhaps in a dusty landscape.
        *   *Narration:* "The government's solution? The Royal Australian Artillery, armed with machine guns."
        *   *Image Prompt Idea:* \`Realistic photograph, 1930s Australian soldiers in period uniform, one manning a Lewis machine gun on a tripod, another soldier nearby. Arid, dusty landscape. Serious expressions. Cinematic, gritty feel.\`

    *   **Scene 4: The Conflict**
        *   *Story:* Emus prove surprisingly difficult targets.
        *   *Visual:* Soldiers firing, emus scattering but not easily hit. Maybe a comedic element of frustration.
        *   *Narration:* "But the emus were surprisingly resilient, dodging bullets with surprising agility."
        *   *Image Prompt Idea:* \`Action photograph, low angle, Australian soldiers firing Lewis machine guns at a distant, fast-moving flock of emus scattering in a dusty field. Muzzle flash visible. Sense of chaotic movement. 1930s.\`

    *   **Scene 5: The Outcome**
        *   *Story:* The military "loses" to the emus.
        *   *Visual:* Frustrated soldiers, perhaps emus looking unfazed in the background.
        *   *Narration:* "After weeks of futility, the military withdrew. The emus had won the 'Great Emu War'."
        *   *Image Prompt Idea:* \`Realistic photograph, a dejected 1930s Australian soldier wiping sweat from his brow, Lewis gun resting beside him. In the background, a few emus stand defiantly in a field. Late afternoon light.\`

    *   **Scene 6: Conclusion/Reflection**
        *   *Story:* A strange but true historical event.
        *   *Visual:* A more iconic, perhaps slightly stylized shot of an emu.
        *   *Narration:* "A bizarre, yet true, chapter in history. Sometimes, nature fights back."
        *   *Image Prompt Idea:* \`Dramatic portrait photograph, close-up of an emu's head and neck, looking directly at the camera with an intelligent, slightly defiant gaze. Blurred outback background. Sharp focus on the emu's eye and feathers. Golden hour lighting.\`


    *   Use terms like "photograph," "realistic," "cinematic lighting," "depth of field," "sharp focus," "grainy film look (optional for period)."
    *   Specify camera angles (low angle, eye-level, close-up).
    *   Mention details like clothing, equipment, environment (dust, sun).
    *   Avoid overly artistic or fantastical terms unless specifically aiming for that.


    *   Create a root object (e.g., \`{"video_script": [...]}\`).
    *   Each scene becomes an object in an array.
    *   Each scene object has \`scene_number\`, \`duration_seconds\`, \`image_prompt\`, and \`content_text\`.
    *   Ensure total duration is ~30 seconds. (6 scenes * 5s/scene = 30s).

7.  **Review and Iterate:**
    *   Read through the narration. Does it flow well? Is it concise?
    *   Are the image prompts descriptive enough to get good results?
    *   Is the story clear within the 30-second timeframe?
    *   Does the JSON structure match the request?
    *   Check for typos or inconsistencies.

    *(Self-correction during review):* Initially, I might have made the narration too long for some scenes. I'd need to shorten it to fit the 5-second target per scene. Also, ensure the prompts are specific enough about the "1930s" setting and "Australian" context. The "realistic photograph" part is key. I also want to make sure the prompts guide the AI towards a sense of historical authenticity.

This detailed thought process allows for systematic creation of the script, ensuring all constraints are met and the output is high quality.`,
        },
        {
          text: `Okay, here's a JSON formatted script for a 30-second video about the bizarre "War of the Bucket" between Modena and Bologna in 1325. This story is interesting, visual, and can be condensed effectively.

\`\`\`json
{
  
  "scenes": [
    {
      "scene_number": 1,
      "duration_seconds": 5,
      "image_prompt": "Realistic historical painting style, 14th century Italian cityscape, Modena town square at midday. A wooden well with a simple oak bucket sits prominently. Sunlight streams down. Civilians milling about in period attire. Photorealistic details, high resolution.",
      "content_text": "Narrator: Italy, 1325. Tensions simmered between the rival city-states of Modena and Bologna."
    },
    {
      "scene_number": 2,
      "duration_seconds": 6,
      "image_prompt": "Realistic action photograph, night scene. A small group of cloaked Modenese soldiers stealthily infiltrating the Bologna city wall, one soldier triumphantly snatching an ordinary wooden bucket from a public well. Low-key lighting, dramatic shadows, cinematic.",
      "content_text": "Narrator: One night, Modenese soldiers snuck into Bologna and stole... a wooden bucket from a public well."
    },
    {
      "scene_number": 3,
      "duration_seconds": 6,
      "image_prompt": "Realistic historical reenactment photograph. Bolognese city officials in ornate 14th-century robes, looking outraged and demanding, gesturing angrily towards a Modenese envoy who appears defiant. Interior council chamber, natural window light. Highly detailed clothing textures.",
      "content_text": "Narrator: Outraged, Bologna demanded its return. Modena, proud and defiant, refused. The insult was too great."
    },
    {
      "scene_number": 4,
      "duration_seconds": 7,
      "image_prompt": "Realistic epic battle scene photograph, wide shot. Thousands of 14th-century Italian knights and foot soldiers clashing on a dusty battlefield. Banners of Modena and Bologna flying. Intense combat, dynamic poses, horses rearing. Cinematic, gritty, historical accuracy. Sun glinting off armor.",
      "content_text": "Narrator: Over this humble bucket, a full-scale war erupted – the Battle of Zappolino. Thousands perished."
    },
    {
      "scene_number": 5,
      "duration_seconds": 6,
      "image_prompt": "Realistic museum display photograph. A single, old, weathered wooden bucket, displayed reverently in a glass case inside a dimly lit stone tower room (Torre della Ghirlandina, Modena). Spotlight on the bucket. Sense of age and historical significance. Sharp focus, shallow depth of field.",
      "content_text": "Narrator: Modena won, and the bucket remains in Modena to this day – a bizarre trophy of a pointless war."
    }
  ]
}
\`\`\`

**Explanation of Prompts and Choices:**

*   **"Interesting Historical Story":** The War of the Bucket is quirky, memorable, and illustrates the often absurd nature of historical conflicts.
*   **"AI Image Prompt with Realistic Format":**
    *   **Keywords:** "Realistic historical painting style," "Realistic action photograph," "Realistic historical reenactment photograph," "Realistic epic battle scene photograph," "Realistic museum display photograph" guide the AI towards photorealism or a very convincing artistic representation.
    *   **Details:** Specifics like "14th century," "Italian cityscape," "Modenese soldiers," "period attire," "wooden well," "cloaked," "ornate robes," "knights," "banners," "glass case," "stone tower room" provide necessary context.
    *   **Artistic/Photographic Terms:** "Photorealistic details," "high resolution," "low-key lighting," "dramatic shadows," "cinematic," "natural window light," "highly detailed clothing textures," "dynamic poses," "gritty," "sun glinting off armor," "spotlight," "sharp focus," "shallow depth of field" help the AI understand the desired aesthetic.
*   **"Content Text":** Kept concise for narration or on-screen text, fitting the short duration of each scene.
*   **Pacing:** The durations are balanced to tell the story within 30 seconds.
*   **JSON Format:** Adheres to the requested structure with \`image_prompt\` and \`content_text\` as fields for each scene.

This script should provide a good foundation for generating the video. The AI image generator will interpret these prompts to create the visuals.`,
        },
      ],
    },
        
      
    ],
  });


