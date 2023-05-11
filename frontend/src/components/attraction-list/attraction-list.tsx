import { $, component$, useSignal, useTask$ } from '@builder.io/qwik';
import styles from './attraction-list.module.css';
import type { NearbySearchResponse } from './models/nearby-search-response.type';
import type { PointsOfInterest } from './models/points-of-interest.type';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import type { CurrentLocation } from '../current-location/models/current-location.type';

export default component$<CurrentLocation>((props) => {
  const attractionsList = useSignal<PointsOfInterest[]>([]);
  const currentLocation = useSignal<CurrentLocation>({
    latitude: props.latitude,
    longitude: props.longitude,
  });
  const navigate = useNavigate();
  const loc = useLocation();

  useTask$(async () => {
    await fetch(`${loc.url.origin}/backend/attractions-list`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentLocation.value),
    })
      .then((res) => res.json())
      .then((res: NearbySearchResponse) => {
        attractionsList.value = res.results;
      })
      .catch(() => {
        attractionsList.value = [];
      });
  });

  const onSelect = $((attractionName: string, compoundCode?: string) => {
    const locationName = compoundCode?.split(' ').slice(1).join(' ');
    navigate(`/attractions/${locationName}/${attractionName}`);
  });

  return (
    <div>
      <h4 class={styles['attraction-list-title']}>Nearby attractions</h4>
      <div class={styles['attraction-list']}>
        {attractionsList.value.map((attraction) => (
          <button
            class={styles['attraction']}
            key={attraction.place_id}
            onClick$={() =>
              onSelect(attraction.name, attraction.plus_code.compound_code)
            }
          >
            {attraction.name}
          </button>
        ))}
      </div>
    </div>
  );
});
