import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import styles from './attraction-information.module.css';

function fetchInformation() {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.CHATGPT_API_KEY,
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
    (res) =>
      res.json().catch((err) => {
        console.log(err.message);
      })
  );
}

export default component$(() => {
  const attractionFact = useSignal<string>('');
  useTask$(async () => {
    await fetchInformation()
      .then((res) => {
        console.log(res);
        attractionFact.value = res?.choices[0].text;
      })
      .catch(() => {
        attractionFact.value = 'Could not fetch information';
      });
  });

  return (
    <div class={styles['fact']}>
      <div>{attractionFact.value}</div>
    </div>
  );
});
