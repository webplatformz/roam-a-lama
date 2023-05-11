import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './attraction-information.module.css';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import type { AttractionInformation } from './models/attraction-information.type';
import type { CurrentLocation } from '../current-location/models/current-location.type';

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

  useTask$(async () => {
    await fetch(`${loc.url.origin}/backend/attractions`, {
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
        attractionFact.value = 'Could not fetch information';
      });
  });

  return (
    <div class={styles['fact']}>
      <div>{attractionFact.value}</div>
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
