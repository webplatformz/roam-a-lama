import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async (requestEvent) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_CHATGPT_API_KEY,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt:
        'Tell me a fun fact about Bern in Switzerland in a single sentence with less than 20 words.',
      temperature: 0.8,
      max_tokens: 20,
    }),
  };
  const attractionInfo = await fetch(
    'https://api.openai.com/v1/completions',
    requestOptions
  ).then((res) => res.json());

  requestEvent.json(200, attractionInfo);
};
