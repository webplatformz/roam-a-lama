import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import AttractionList from '~/components/attraction-list/attraction-list';
import Header from '~/components/starter/header/header';

export default component$(() => {
  const loc = useLocation();

  const coordinates = loc.params;

  return (
    <>
      <Header />
      <AttractionList
        latitude={+coordinates.latitude}
        longitude={+coordinates.longitude}
      />
    </>
  );
});
