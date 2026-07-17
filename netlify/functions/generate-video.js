import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);

    const result = await fal.subscribe("fal-ai/veo3.1/fast", {
      input: {
        prompt: prompt,
        aspect_ratio: "16:9",
        duration: "8s",
        resolution: "720p"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        video: result.data.video.url
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
}
