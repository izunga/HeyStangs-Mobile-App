import BackButton from "../components/BackButton.tsx";
import {Logo} from "../components/Logo.tsx";
import {ResultCard, Question, QData} from "../components/ResultCard.tsx";
// import {questionTestData} from "../components/TestData.tsx";
import {useEffect, useState} from "react";
import {getData} from "../backend/api.ts";
import {BaseDataEntry, Data} from "react-minimal-pie-chart/dist/commonTypes";

function Results() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [questionData, setQData] = useState<QData[]>([]);

  const fetchQuestions = async (): Promise<QData[]> => {
    setLoading(true); // Set loading to true while fetching data

    return new Promise<QData[]>(async (resolve, reject) => {
      try {
        const data: QData[] = await getData("get-all-questions");
        resolve(data);
      } catch (err) {
        setError("Failed to load questions");
        reject(err);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    });
  };

  useEffect(() => {
    fetchQuestions().then(setQData);
  }, []);

  useEffect(() => {
    console.log(questionData); // This will log the updated state after the re-render
  }, [questionData]);

  // if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div
      className="w-[375px] h-[812px] px-[27px] py-[49px] bg-[#354ca1] inline-flex flex-col justify-start items-center gap-7 overflow-hidden">
      <BackButton/>
      <Logo/>
      {!loading && <div
        className="w-[320px] h-[600px] mx-auto
        absolute inline-flex flex-col
        justify-start items-start gap-[16px]
        overflow-y-auto mt-28
        box-content
        ">
        {
          questionData?.map((q) => {
            return (
              <ResultCard key={q.id} data={q}/>
            )
          })
        }
      </div>}
    </div>
  );
}

export default Results;