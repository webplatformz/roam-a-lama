import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default component$(() => {
  const attractionFact = useSignal<string>('');

  useTask$(async () => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt:
        'Tell me something about Bern in Switzerland in less than 50 words',
      temperature: 0.8,
      max_tokens: 50,
    });
    attractionFact.value =
      response.data.choices[0].text || 'Could not fetch information';
  });

  return <div class='fact'>{attractionFact.value}</div>;
});
