import { component$ } from '@builder.io/qwik';
import Header from '~/components/starter/header/header';
import AttractionInformation from '~/components/attraction-information/attraction-information';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation().params;

  return (
    <>
      <Header />
      <AttractionInformation location={loc.location} name={loc.name} />
    </>
  );
});
