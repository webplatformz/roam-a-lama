import { component$ } from '@builder.io/qwik';
import styles from './home.module.css';
import { Lama } from '~/components/starter/icons/lama';
import { useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
  const navigate = useNavigate();

  return (
    <>
      <div class={styles.title}>
        <h1>Roam a Llama</h1>
        <h2>your gps based audio guide</h2>
      </div>
      <div class={styles.startContainer}>
        <div
          class={styles.circle}
          onClick$={() => navigate('/points-of-interest')}
        >
          <div class={styles.lama}>
            <Lama />
          </div>
          <div class={styles.triangle}></div>
        </div>

        <div
          class={styles.start}
          onClick$={() => navigate('/points-of-interest')}
        >
          <h3>Start now!</h3>
        </div>
      </div>
    </>
  );
});
