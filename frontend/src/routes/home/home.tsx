import { $, component$, useSignal } from '@builder.io/qwik';
import styles from './home.module.css';
import { Lama } from '~/components/starter/icons/lama';
import { useNavigate } from '@builder.io/qwik-city';
import { Lama_eye_left } from '~/components/starter/icons/lama_eye_left';
import { Lama_eye_right } from '~/components/starter/icons/lama_eye_right';
import {Lama_glasses} from "~/components/starter/icons/lama_glasses";

export default component$(() => {
  const showEyes = useSignal(true);
  const navigate = useNavigate();

  const one = useSignal('');
  const two = useSignal('');

    const startSearch = $(() => {

        showEyes.value = false;

        const interval = setInterval(() => {
            const color = ['var(--lama-white)', 'var(--lama-background)'];
            one.value = color[Math.floor(Math.random() * 2)];
            two.value = color[Math.floor(Math.random() * 2)];
            // @ts-ignore
            document.getElementById("glasses-background").style.fill = one.value;
            // @ts-ignore
            document.getElementById("glasses-dots").style.fill = two.value;
        }, 200);

        setTimeout(function () {
            navigate('/points-of-interest');
            clearInterval(interval);
        }, 2000);
    });

  return (
    <>
      <div class={styles.title}>
        <h1>Roam a Llama</h1>
        <h2>your gps based audio guide</h2>
      </div>
      <div class={styles.startContainer}>
        <div
          class={styles.circle}
          onClick$={() => startSearch()}
        >
          <div class={styles.lama}>
            {showEyes.value && (
              <div
                document:onMouseMove$={(event) => {
                  const eyeBall: any = document.getElementById('eyeball-left');
                  const pupilLeft: any = document.getElementById('pupil-left');
                  const pupilRight: any =
                    document.getElementById('pupil-right');
                  const eyeAreaRadius = 15;
                  const pupilAreaRadius = 8;
                  const eyeArea = eyeBall.getBoundingClientRect();
                  const centerX = eyeArea.left + eyeAreaRadius;
                  const centerY = eyeArea.top + eyeAreaRadius;

                  const x = event.clientX - centerX,
                    y = event.clientY - centerY,
                    theta = Math.atan2(y, x),
                    angle = (theta * 180) / Math.PI + 360;

                  pupilLeft.style.transform = `translateX(${
                    eyeAreaRadius - pupilAreaRadius + 'px'
                  }) rotate(${angle + 'deg'})`;
                  pupilLeft.style.transformOrigin = `${
                    pupilAreaRadius + 'px'
                  } center`;

                  pupilRight.style.transform = `translateX(${
                    eyeAreaRadius - pupilAreaRadius + 'px'
                  }) rotate(${angle + 'deg'})`;
                  pupilRight.style.transformOrigin = `${
                    pupilAreaRadius + 'px'
                  } center`;
                }}
              >
                <div class={styles.eyeLeft}>
                  <Lama_eye_left />
                </div>
                <div class={styles.eyeRight}>
                  <Lama_eye_right />
                </div>
              </div>
            )}

            {!showEyes.value && (
                <div class={styles.glasses} style={{
                    fill: `${one.value}`,
                }}>
                  <Lama_glasses />
                </div>
            )}
            <div class={styles.wholeLama}>
              <Lama />
            </div>
          </div>
          <div class={styles.triangle}></div>
        </div>

        <div
          class={styles.start}
          onClick$={() => startSearch()}
        >
          <h3>Start now!</h3>
        </div>
      </div>
    </>
  );
});
