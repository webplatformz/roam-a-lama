import type { RequestHandler } from '@builder.io/qwik-city';
import type { AttractionInfo } from '~/components/attraction-information/attraction-information';
import type { GptConfig } from '~/components/gpt-settings/models/gpt-config.model';

export const onPost: RequestHandler = async (requestEvent) => {
  const attractionInfo: AttractionInfo = await requestEvent.request
    .text()
    .then((res) => JSON.parse(res));

  const config = attractionInfo.config;

  const getPrompt = () => {
    let prompt;
    if (config?.isFiction) {
      prompt = `Invent a ${config?.isFunny ? 'funny ' : ''} ${
        config?.isHistoric ? 'historic ' : ''
      }story including the ${attractionInfo.name} in ${
        attractionInfo.location
      }`;
    } else {
      prompt = `Tell me something ${config?.isFunny ? 'funny ' : ''} ${
        config?.isHistoric ? 'historic ' : ''
      } about the ${attractionInfo.name} in ${attractionInfo.location}`;
    }
    switch (config?.narrator) {
      case 'trump':
        prompt +=
          ' as someone with power but simple vocabulary, lots of adjectives like  many, fantastic, big, huge, amazing, great, very, crooked, fake. Adjectives are always prefixed with "so". It should contain confusing statements that are out of context. It should contain lots of personal statements about the narrator. The narrator is quite stupid.';
        break;
      case 'attenborough':
        prompt += ' as David Attenborough';
        break;
      case 'lama':
        prompt += ' from the perspective of a lama';
        break;
      case 'homeless':
        prompt += ' from the perspective of a homeless person';
        break;
      case 'snail':
        prompt += ' from the perspective of a snail';
        break;
    }
    switch (config?.length) {
      case 'short':
        prompt += ' in less than 50 words.';
        break;
      case 'normal':
        prompt += ' in less than 150 words.';
        break;
      case 'long':
        prompt += ' in less than 600 words.';
        break;
      default:
        prompt += ' in less than 300 words.';
    }
    return prompt;
  };

  const getMaxToken = (gptConfig?: GptConfig) => {
    switch (gptConfig?.length) {
      case 'short':
        return 50;
      case 'normal':
        return 150;
      case 'long':
        return 600;
      default:
        return 300;
    }
  };

  console.log(getPrompt());

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_CHATGPT_API_KEY,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: getPrompt(),
      temperature: 0.8,
      max_tokens: getMaxToken(config),
    }),
  };
  const gptInfo = await fetch(
    'https://api.openai.com/v1/completions',
    requestOptions
  ).then((res) => {
    return res.json();
  });
  requestEvent.json(200, gptInfo);
};
