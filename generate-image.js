exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch("https://fal.run/fal-ai/flux-pro", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt
      })
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: text
        })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        image: data.images?.[0]?.url || null
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }
};