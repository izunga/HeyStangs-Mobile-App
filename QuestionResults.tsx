import { useState, useEffect } from "react";
import { apiService } from "./apiService";
import { ResultCard } from "../components/ResultCard"; // Ensure this component is implemented correctly
import { getData } from "./api.ts"; // Import the postData function

type QuestionResultProps = {
  questionId: number;
};

export default function QuestionResult({ questionId }: QuestionResultProps) {
  const [question, setQuestion] = useState<string>("");
  const [voteData, setVoteData] = useState<{ yes: number; no: number; abstain: number }>({
    yes: 0,
    no: 0,
    abstain: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionData = await getData("get-question", { question_id: questionId });
        if (questionData) setQuestion(questionData.body);

        const voteData = await getData("get-vote-count", { question_id: questionId })
        if (voteData) {
          setVoteData({
            yes: voteData.yes_count || 0,
            no: voteData.no_count || 0,
            abstain: voteData.abstain_count || 0,
          });
        }
      } catch (error) {
        console.error(`Failed to fetch data for question ${questionId}:`, error);
      }
    };

    fetchData();
  }, [questionId]);

  return (
    <ResultCard
      question={question}
      data={[
        { title: "Yes", value: voteData.yes, color: "#14AE5C" },
        { title: "No", value: voteData.no, color: "#D21143" },
        { title: "Abstain", value: voteData.abstain, color: "#757575" },
      ]}
    />
  );
}
