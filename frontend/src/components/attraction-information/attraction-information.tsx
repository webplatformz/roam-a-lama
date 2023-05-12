import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './attraction-information.module.css';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import type { AttractionInformation } from './models/attraction-information.type';
import type { CurrentLocation } from '../current-location/models/current-location.type';
import TextToSpeech from '../text-to-speech';

export interface AttractionInfo {
  location: string;
  name: string;
}

export default component$<AttractionInfo>((props) => {
  const attractionFact = useSignal<string>('');
  const loc = useLocation();
  const navigate = useNavigate();
  const isLocating = useSignal(true);

  const currentLocation = useSignal<CurrentLocation | undefined>();

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

  const gptResource = useResource$<any>(async ({ track, cleanup }) => {
    track(() => attractionFact);
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    const res = await fetch(`${loc.url.origin}/backend/attractions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: props.location,
        name: props.name,
      }),
    })
      .then((res) => res.json())
      .then((res: AttractionInformation) => {
        attractionFact.value = res?.choices[0].text;
      })
      .catch(() => {
        attractionFact.value = "Text-to-speech feature is now available on fairly any website, blog or newsletter like Substack. It's a game changer that you can listen to the content instead of reading it. Especially effective for people with visual or cognitive impairments or people who are on the go. I came up with the idea to implement it for my blog, so this is how I started doing a research on this topic which ended up being a tutorial for you. So in this tutorial, we will go through the process of building a text-to-speech component in React. We will use the Web Speech API to implement the text-to-speech functionality.";


      });

    return res;
  });

  return (
    <div class={styles.factcontainer}>
      <Resource
        value={gptResource}
        onPending={() => <div class={styles.fact}>Loading...</div>}
        onResolved={() => {
          return (
            <div class={styles.fact}>
              <TextToSpeech text={attractionFact.value} />
              <div>{attractionFact.value}</div>
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
