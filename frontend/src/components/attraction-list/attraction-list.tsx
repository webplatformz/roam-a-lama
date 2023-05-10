import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import styles from './attraction-list.module.css';
import type { NearbySearchResponse } from './models/nearby-search-response.type';
import type { PointsOfInterest } from './models/points-of-interest.type';

function fetchPointsOfInterest() {
  const locationCoordinates = '46.9415379005%2C7.43980157412'; // BERN
  const apiKey = process.env.MAPS_API_KEY;
  return fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationCoordinates}&type=tourist_attraction&key=${apiKey}&rankby=distance`
  ).then((res) => res.json());
}

export default component$(() => {
  const attractionsList = useSignal<PointsOfInterest[]>([]);
  useTask$(async () => {
    await fetchPointsOfInterest()
      .then((res: NearbySearchResponse) => {
        attractionsList.value = res.results;
      })
      .catch(() => {
        attractionsList.value = [];
      });
  });

  return (
    <div>
      <div class={styles['attraction-list']}>
        {attractionsList.value.map((attraction) => (
          <button class={styles['attraction']} key={attraction.place_id}>
            {attraction.name}
          </button>
        ))}
      </div>
    </div>
  );
});
