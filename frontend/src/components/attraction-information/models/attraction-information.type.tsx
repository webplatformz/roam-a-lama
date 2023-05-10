import type { AttractionChoice } from './attraction-choice.type';

export type AttractionInformation = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: AttractionChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
