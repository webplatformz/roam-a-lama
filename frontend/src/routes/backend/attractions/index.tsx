import type { RequestHandler } from '@builder.io/qwik-city';
import type { AttractionInfo } from '~/components/attraction-information/attraction-information';

export const onPost: RequestHandler = async (requestEvent) => {
  const attractionInfo: AttractionInfo = await requestEvent.request
    .text()
    .then((res) => JSON.parse(res));
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_CHATGPT_API_KEY,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: `Tell me something about ${attractionInfo.name} in ${attractionInfo.location} with less than 20 words.`,
      temperature: 0.8,
      max_tokens: 20,
    }),
  };
  const gptInfo = await fetch(
    'https://api.openai.com/v1/completions',
    requestOptions
  ).then((res) => {
    return res.json();
  });
  requestEvent.json(200, gptInfo);
};
