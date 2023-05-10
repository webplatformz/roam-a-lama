import { component$ } from '@builder.io/qwik';
import AttractionList from '~/components/attraction-list/attraction-list';
import Header from '~/components/starter/header/header';

export default component$(() => {
  return (
    <>
      <Header />
      <AttractionList />
    </>
  );
});
