import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import type { QwikIntrinsicElements } from '@builder.io/qwik';
import styles from './attraction-list.module.css';
import type { NearbySearchResponse } from './models/nearby-search-response.type';
import type { PointsOfInterest } from './models/points-of-interest.type';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import type { CurrentLocation } from '../current-location/models/current-location.type';

export function SubwayStar(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 512 512'
      {...props}
      key={key}
    >
      <path
        fill='currentColor'
        d='M512 207.9H315.1L256 11l-59.1 196.9H0l157.5 108.3l-59 187.1L256 404.8l157.5 98.5l-59-187.1z'
      ></path>
    </svg>
  );
}

export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10;
}

export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default component$<CurrentLocation>((props) => {
  const attractionsList = useSignal<PointsOfInterest[]>([]);
  const currentLocation = useSignal<CurrentLocation>({
    latitude: props.latitude,
    longitude: props.longitude,
  });
  const navigate = useNavigate();
  const loc = useLocation();

  useTask$(async () => {});

  const attrListResource = useResource$<any>(async ({ track, cleanup }) => {
    track(() => attractionsList);
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    const res = await fetch(`${loc.url.origin}/backend/attractions-list`, {
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
    return res;
  });

  const onSelect = $((attractionName: string, compoundCode?: string) => {
    const locationName = compoundCode?.split(' ').slice(1).join(' ');
    navigate(`/attractions/${locationName}/${attractionName}`);
  });

  return (
    <div>
      <h4 class={styles['attraction-list-title']}>Nearby attractions</h4>
      <Resource
        value={attrListResource}
        onPending={() => (
          <div class={styles['attraction-list']}>Loading...</div>
        )}
        onResolved={() => {
          return (
            <div class={styles['attraction-list']}>
              {attractionsList.value.map((attraction) => (
                <button
                  class={styles['attraction']}
                  key={attraction.place_id}
                  onClick$={() =>
                    onSelect(
                      attraction.name,
                      attraction.plus_code.compound_code
                    )
                  }
                >
                  <div class={styles['icon-container']}>
                    <img src={attraction.icon} class={styles['icon']} />
                  </div>
                  <div class={styles['label-container']}>
                    <div class={styles['label']}>
                      <div>{attraction.name}</div>
                    </div>
                    {attraction.rating ? (
                      <div class={styles['rating']}>
                        <div>{`${attraction.rating}`}</div>
                        <div class={styles['star-icon']}>
                          <SubwayStar />
                        </div>
                        <div
                          style={{ marginLeft: '5px' }}
                        >{`(${attraction.user_ratings_total})`}</div>
                      </div>
                    ) : null}
                    <div>
                      <div class={styles['rating']}>
                        {getDistance(
                          currentLocation.value.latitude,
                          currentLocation.value.longitude,
                          attraction.geometry.location.lat,
                          attraction.geometry.location.lng
                        )}
                        km
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
});
