import {$, component$} from '@builder.io/qwik';
import styles from './home.module.css';
import {Lama} from "~/components/starter/icons/lama";


export default component$(() => {

    const startSearch = $(() => {
        console.log('searching for attractions around');
    });

    return (
        <>
            <div class={styles.title}>
                <h1>Roam a Llama</h1>
                <h2>your gps based audio guide</h2>
            </div>
            <div class={styles.startContainer}>
                <div class={styles.circle} onClick$={() => startSearch()}>
                    <div class={styles.lama}>
                        <Lama/>
                    </div>
                    <div class={styles.triangle}></div>
                </div>

                <div class={styles.start} onClick$={() => startSearch()}>
                    <h3>Start now</h3>
                </div>
            </div>

        </>
    );
});