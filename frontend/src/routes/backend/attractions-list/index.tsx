import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async (requestEvent) => {
  const locationCoordinates = '46.9415379005%2C7.43980157412'; // BERN
  const apiKey = import.meta.env.VITE_MAPS_API_KEY;
  const attractionsNearby = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationCoordinates}&type=tourist_attraction&key=${apiKey}&rankby=distance`
  ).then((res) => res.json());

  requestEvent.json(200, attractionsNearby);
};
