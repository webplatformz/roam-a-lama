import type {Signal} from "@builder.io/qwik";
import {component$, noSerialize, useSignal, useVisibleTask$} from "@builder.io/qwik";
import styles from './text-to-speech.module.css';

interface TextToSpeechProps {
    text: string;
}

export default component$<TextToSpeechProps>((props) => {

    const isPaused: Signal<boolean> = useSignal(false);
    const isPlayed: Signal<boolean> = useSignal(false);
    // @ts-ignore
    const voice: Signal<SpeechSynthesisVoice> = useSignal(null);
    const rate = useSignal(1);
    const voices = useSignal([]);

    useVisibleTask$(() => {
        const interval = setInterval(() => {
            // @ts-ignore
            voices.value = noSerialize(window.speechSynthesis.getVoices());
            if (voice.value === null && voices.value.length > 0) {
                // @ts-ignore
                voice.value = noSerialize(voices.value[0]);
            }
        }, 2000);
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <>
            {voices.value.length > 0 &&
                <div class={styles.textToSpeech}>
                    <div>
                        {(!isPlayed.value) &&
                            <button onClick$={() => {
                                isPlayed.value = true;
                                const synth = window.speechSynthesis;
                                if (isPaused) {
                                    synth.resume();
                                }

                                const utterance = new SpeechSynthesisUtterance(props.text);
                                utterance.voice = voice.value;
                                utterance.rate = rate.value;
                                synth.speak(utterance);
                            }}>{isPaused.value ? "Resume" : "Play"}</button>
                        }
                        {isPlayed.value &&
                            <button onClick$={() => {
                                const synth = window.speechSynthesis;
                                synth.pause();
                                isPlayed.value = false;
                                isPaused.value = true;
                            }}>Pause
                            </button>
                        }
                        {(isPlayed.value || isPaused.value) &&
                            <button onClick$={() => {
                                const synth = window.speechSynthesis;
                                synth.cancel();
                                isPaused.value = false;
                                isPlayed.value = false;
                            }}>Stop
                            </button>
                        }
                    </div>

                    {(!isPlayed.value && !isPaused.value) &&
                        <div class={styles.moreSettings}>


                            <div>
                                <label>
                                    Voice:&nbsp;
                                    <select value={voice.value?.name} onChange$={(event) => {
                                        // @ts-ignore
                                        voice.value = noSerialize(voices.value.find((v: SpeechSynthesisVoice) => v.name === event.target.value));
                                    }}>
                                        {voices.value.map((v: SpeechSynthesisVoice) => (
                                            <option key={v.name} value={v.name}>
                                                {v.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div>
                                <label>
                                    Speed:&nbsp;
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="2"
                                        step="0.1"
                                        value={rate.value}
                                        onChange$={(event) => {
                                            rate.value = parseFloat(event.target.value);
                                        }}
                                    />
                                </label>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    );
});
