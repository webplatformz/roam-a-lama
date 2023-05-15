import { component$, useContext } from '@builder.io/qwik';
import styles from './gpt-settings.module.css';
import { GptContext } from '~/routes/layout';

export default component$(() => {
  const gptConfig = useContext(GptContext);

  return (
    <div class={styles['gpt-settings']}>
      <div>
        <h4 class={styles.optiontitle}>Styles:</h4>
        <div class={styles.checkbox}>
          <input
            type='checkbox'
            id='funny'
            name='funny'
            value='funny'
            checked={gptConfig.isFunny}
            onChange$={(_, el) => {
              gptConfig.isFunny = el.checked;
            }}
          />
          <label for='funny'>funny</label>
        </div>
        <div class={styles.checkbox}>
          <input
            type='checkbox'
            id='fictional'
            name='fictional'
            value='fictional'
            checked={gptConfig.isFiction}
            onChange$={(_, el) => {
              gptConfig.isFiction = el.checked;
            }}
          />
          <label for='fictional'>fictional</label>
        </div>
        <div class={styles.checkbox}>
          <input
            type='checkbox'
            id='historic'
            name='historic'
            value='historic'
            checked={gptConfig.isHistoric}
            onChange$={(_, el) => {
              gptConfig.isHistoric = el.checked;
            }}
          />
          <label for='historic'>historic</label>
        </div>
      </div>
      <div>
        <h4 class={styles.optiontitle}>Narrator:</h4>
        <select
          value={gptConfig.narrator}
          onChange$={(event) => {
            // @ts-ignore
            gptConfig.narrator = [
              'normal',
              'attenborough',
              'trump',
              'lama',
              'snail',
            ].find((v: string) => v === event.target.value);
          }}
        >
          <option value={'normal'}>Normal</option>
          <option value={'attenborough'}>David Attenborough</option>
          <option value={'trump'}>Donald Trump</option>
          <option value={'lama'}>Lama</option>
          <option value={'homeless'}>Homeless</option>
          <option value={'snail'}>Snail</option>
        </select>
      </div>
      <div>
        <h4 class={styles.optiontitle}>Length:</h4>
        <select
          value={gptConfig.narrator}
          onChange$={(event) => {
            // @ts-ignore
            gptConfig.length = ['short', 'normal', 'long'].find(
              (v: string) => v === event.target.value
            );
          }}
        >
          <option value={'normal'}>normal</option>
          <option value={'short'}>short</option>
          <option value={'long'}>long</option>
        </select>
      </div>
    </div>
  );
});
