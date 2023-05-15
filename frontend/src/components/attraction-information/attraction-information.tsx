import {
  $,
  Resource,
  component$,
  useContext,
  useResource$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './attraction-information.module.css';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import TextToSpeech from '../text-to-speech';
import type { AttractionInformation } from './models/attraction-information.type';
import type { CurrentLocation } from '../current-location/models/current-location.type';
import type { GptConfig } from '../gpt-settings/models/gpt-config.model';
import { GptContext } from '~/routes/layout';
import GptSettings from '../gpt-settings/gpt-settings';

export interface AttractionInfo {
  location: string;
  name: string;
  config?: GptConfig;
}

export default component$<AttractionInfo>((props) => {
  const attractionFact = useSignal<string>('');
  const loc = useLocation();
  const navigate = useNavigate();
  const isLocating = useSignal(true);
  const currentLocation = useSignal<CurrentLocation | undefined>();
  const gptConfig = useContext(GptContext);

  useVisibleTask$(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const location: CurrentLocation = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
      isLocating.value = false;
      currentLocation.value = location;
    });
  });

  const generateText = $(async () => {
    const res = await fetch(`${loc.url.origin}/backend/attractions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: props.location,
        name: props.name,
        config: gptConfig,
      }),
    })
      .then((res) => res.json())
      .then((res: AttractionInformation) => {
        attractionFact.value = res?.choices[0].text;
      })
      .catch(() => {
        attractionFact.value =
          'Cannot load information. Please reload the page or try again later.';
      });

    return res;
  });

  const gptResource = useResource$<any>(async ({ track, cleanup }) => {
    track(() => attractionFact);
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    return generateText();
  });

  return (
    <div class={styles.factcontainer}>
      <Resource
        value={gptResource}
        onPending={() => (
          <div class={styles.fact}>Let me research that for you...</div>
        )}
        onResolved={() => {
          return (
            <div class={styles.fact}>
              <TextToSpeech text={attractionFact.value} />
              <div>{attractionFact.value}</div>
              <div>
                <GptSettings></GptSettings>
                <div class={styles['regenerate-button-container']}>
                  <button
                    class={styles['regenerate-button']}
                    onClick$={() => generateText()}
                  >
                    Re-Generate
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      />
      <button
        class={styles['back-button']}
        onClick$={() =>
          !isLocating.value &&
          navigate(
            `/points-of-interest/${currentLocation.value?.latitude}/${currentLocation.value?.longitude}`
          )
        }
      >
        Back to list
      </button>
    </div>
  );
});
