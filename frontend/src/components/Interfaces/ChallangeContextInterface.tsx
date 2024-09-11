import { ChallengeData, defaultChallengeData } from "./ChallengeDataInterface";

export interface ChallengeDataContext {
  challengeData: ChallengeData;
  challengeProgression: number;
}

export const defaultChallengeDataContext = {
  challengeData: defaultChallengeData,
  challengeProgression: 0,
};
