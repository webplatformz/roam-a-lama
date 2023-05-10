import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import styles from './attraction-list.module.css';
import type { NearbySearchResponse } from './models/nearby-search-response.type';
import type { PointsOfInterest } from './models/points-of-interest.type';
import { useLocation, useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
  const attractionsList = useSignal<PointsOfInterest[]>([]);
  const navigate = useNavigate();
  const loc = useLocation();

  useTask$(async () => {
    await fetch(`${loc.url.origin}/backend/attractions-list`)
      .then((res) => res.json())
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
          <button
            class={styles['attraction']}
            key={attraction.place_id}
            onClick$={() => navigate('/attractions')}
          >
            {attraction.name}
          </button>
        ))}
      </div>
    </div>
  );
});
