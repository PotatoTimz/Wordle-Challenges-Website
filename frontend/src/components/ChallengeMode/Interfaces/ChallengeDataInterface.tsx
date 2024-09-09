export interface ChallengeData {
  _id: string;
  creator: string;
  name: string;
  description: string;
  words: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export const defaultChallengeData: ChallengeData = {
  _id: "66df0e1a43d70a63312fa728",
  creator: "Andre",
  name: "Challenge #1",
  description: "This is a description for a challenge",
  words: ["board", "drone", "guild"],
  createdAt: "2024-09-09T15:02:50.366Z",
  updatedAt: "2024-09-09T15:02:50.366Z",
};
