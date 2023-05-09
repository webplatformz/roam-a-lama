import {component$, useStyles$} from '@builder.io/qwik';
import {routeLoader$} from '@builder.io/qwik-city';

import styles from './styles.css?inline';
import AttractionInformation from '~/components/attraction-information/attraction-information';
import Home from "~/routes/home/home";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <main>
        <Home />
        <AttractionInformation />
      </main>
    </>
  );
});
