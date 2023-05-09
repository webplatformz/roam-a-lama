import { component$ } from '@builder.io/qwik';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: 'Say this is a test',
  temperature: 0,
  max_tokens: 7,
});

export default component$(() => {
  return (
    <div>
      {() => {
        response;
      }}
    </div>
  );
});
