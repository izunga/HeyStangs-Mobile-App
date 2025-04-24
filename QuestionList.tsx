import { useState, useEffect } from "react";
import QuestionResult from "./QuestionResults.tsx"; // Importing the result component
import { getData } from "./api.ts"; // Import the postData function

export default function QuestionList() {
  const [questionIds, setQuestionIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getData("get-all-questions", {}); // API call using postData
        setQuestionIds(data.map((item: { id: number }) => item.id));
      } catch (err) {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {questionIds.map((id) => (
        <QuestionResult key={id} questionId={id} />
      ))}
    </div>
  );
}
