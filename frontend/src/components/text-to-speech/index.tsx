import type {Signal} from "@builder.io/qwik";
import {component$, useSignal} from "@builder.io/qwik";
import styles from './text-to-speech.module.css';

interface TextToSpeechProps {
    text: string;
}

export default component$<TextToSpeechProps>((props) => {

    const isPaused: Signal<boolean> = useSignal(false);

    return (
        <>
            <div class={styles.textToSpeech}>
                <div>
                    <button onClick$={() => {
                        const synth = window.speechSynthesis;
                        if (isPaused) {
                            synth.resume();
                        }
                        synth.speak(new SpeechSynthesisUtterance(props.text));
                        isPaused.value = true;
                    }}>{isPaused.value ? "Resume" : "Play"}</button>
                    <button onClick$={() => {
                        const synth = window.speechSynthesis;
                        synth.pause();
                        isPaused.value = true;
                    }}>Pause
                    </button>
                    <button onClick$={() => {
                        const synth = window.speechSynthesis;
                        synth.cancel();
                        isPaused.value = false;
                    }}>Stop
                    </button>
                </div>
            </div>

        </>
    );
});
