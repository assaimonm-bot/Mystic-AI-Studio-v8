exports.handler = async (event) => {
  const { prompt } = JSON.parse(event.body);

  const response = await fetch("https://fal.run/fal-ai/veo3.1/fast", {
    method: "POST",
    headers: {
      "Authorization": `Key ${process.env.FAL_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompt,
      aspect_ratio: "16:9",
      duration: "8s",
      resolution: "720p"
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};