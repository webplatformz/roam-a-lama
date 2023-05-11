import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import styles from './attraction-information.module.css';
import { useLocation } from '@builder.io/qwik-city';
import type { AttractionInformation } from './models/attraction-information.type';
import TextToSpeech from "../text-to-speech";

export default component$(() => {
  const attractionFact = useSignal<string>('');
  const loc = useLocation();

  useTask$(async () => {
    await fetch(`${loc.url.origin}/backend/attractions`)
      .then((res) => res.json())
      .then((res: AttractionInformation) => {
        attractionFact.value = res?.choices[0].text;
      })
      .catch(() => {
        attractionFact.value = 'Could not fetch information';
      });
  });

  return (
    <div class={styles.fact}>
      <TextToSpeech text={attractionFact.value} />
      <div>{attractionFact.value}</div>
    </div>
  );
});
