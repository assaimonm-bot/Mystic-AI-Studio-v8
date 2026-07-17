import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);

    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt: prompt
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        image: result.data.images[0].url
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
