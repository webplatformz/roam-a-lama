import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import styles from './attraction-information.module.css';
import type { AttractionInformation } from './models/attraction-information.type';

const fetchInformation = () => {
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
  return fetch('https://api.openai.com/v1/completions', requestOptions).then(
    (res) => res.json()
  );
};

export default component$(() => {
  const attractionFact = useSignal<string>('');
  useTask$(async () => {
    await fetchInformation()
      .then((res: AttractionInformation) => {
        attractionFact.value = res?.choices[0].text;
      })
      .catch(() => {
        attractionFact.value = 'Could not fetch information';
      });
  });

  useTask$(async () => {
    const response = await fetch('/backend/hello').then((resp) => resp.json());

    console.log({ response });
  });

  return (
    <div class={styles['fact']}>
      <div>{attractionFact.value}</div>
    </div>
  );
});
