import {component$} from '@builder.io/qwik';
import { Lama } from '../icons/lama';
import styles from './header.module.css';

export default component$(() => {

  return (
    <header class={styles.header}>
          <a href="/" title="home">
            <Lama/>
            <h2>Roam-a-Llama</h2>
          </a>
    </header>
  );
});
