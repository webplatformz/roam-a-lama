export type GptConfig = {
  length: 'short' | 'normal' | 'long';
  isFunny: boolean;
  isHistoric: boolean;
  isFiction: boolean;
  narrator: 'attenborough' | 'trump' | 'normal' | 'lama' | 'homeless' | 'snail';
};
