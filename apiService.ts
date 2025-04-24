import { getData } from "./api.ts";

export const apiService = {
  getAllQuestionIds: async () => await getData("get-all-questions", {}),
  getQuestionById: async (questionId: number) => await getData("get-question", { question_id: questionId }),
  getVoteResults: async (questionId: number) => await getData("get-vote-count", { question_id: questionId }),
};
