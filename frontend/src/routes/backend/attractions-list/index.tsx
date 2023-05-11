import type { RequestHandler } from '@builder.io/qwik-city';
import type { CurrentLocation } from '~/components/current-location/models/current-location.type';

export const onPost: RequestHandler = async (requestEvent) => {
  const coordinates: CurrentLocation = await requestEvent.request
    .text()
    .then((res) => JSON.parse(res));
  const locationCoordinates = `${coordinates.latitude}%2C${coordinates.longitude}`;
  const apiKey = import.meta.env.VITE_MAPS_API_KEY;
  const attractionsNearby = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationCoordinates}&type=tourist_attraction&key=${apiKey}&rankby=distance`
  ).then((res) => {
    return res.json();
  });
  requestEvent.json(200, attractionsNearby);
};
