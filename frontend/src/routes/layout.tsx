import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from '@builder.io/qwik';

import styles from './styles.css?inline';
import type { GptConfig } from '~/components/gpt-settings/models/gpt-config.model';

export const GptContext = createContextId<GptConfig>('GptConfig');

export default component$(() => {
  useContextProvider(
    GptContext,
    useStore<GptConfig>({
      length: 'normal',
      isFunny: false,
      isHistoric: false,
      isFiction: false,
      narrator: 'normal',
    })
  );

  useStyles$(styles);
  return (
    <>
      <main>
        <Slot />
      </main>
    </>
  );
});
