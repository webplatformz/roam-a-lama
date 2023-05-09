import type { GenerationChoice } from './generation-choice.type';

export type AttractionInformation = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: GenerationChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
