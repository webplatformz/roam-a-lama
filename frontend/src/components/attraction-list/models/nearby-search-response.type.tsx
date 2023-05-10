import type { PointsOfInterest } from './points-of-interest.type';

export type NearbySearchResponse = {
  html_attributions: string[];
  next_page_token: string;
  results: PointsOfInterest[];
  status: string;
};
