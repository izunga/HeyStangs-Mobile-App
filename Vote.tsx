import BackButton from "../components/BackButton.tsx";
import {Peruna} from "../components/Logo.tsx"
import {Card, TestimonialCard} from "compositions";
import {placeholder} from "images";
import {IconButton, TextHeading, TextSmall} from "primitives"
import {IconThumbsDown, IconMinusCircle, IconThumbsUp} from "icons"
import {Flex} from "layout";
import {useEffect, useState} from "react";
import {QData, Question, ResultPie} from "../components/ResultCard.tsx";
import {getData} from "../backend/api.ts";
import {useLocation} from "react-router-dom";

export type VotePageProps = {
  questionID?: number | null
}

function Vote() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [questionData, setQData] = useState<QData>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const location = useLocation();
  const quID = location.state?.questionID ?? null;
  console.log("quID: ",quID);

  const fetchRandomQuestion = async (): Promise<QData[]> => {
    setLoading(true);
    return new Promise<QData>(async (resolve, reject) => {
      try {
        const data: QData[] = await getData("get-all-questions");
        const question = getRandomItem(data);
        resolve(question); // Resolve with the fetched data
      } catch (err) {
        setError("Failed to load questions"); // Handle error
        reject(err); // Reject the promise with the error
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    });
  };

  const fetchQuestion = async ({quID} : {quID: number}): Promise<QData[]> => {
    setLoading(true);
    return new Promise<QData>(async (resolve, reject) => {
      try {
        const question: QData[] = await getData(`get-question?id=${quID}`);
        resolve(question); // Resolve with the fetched data
      } catch (err) {
        setError("Failed to load questions"); // Handle error
        reject(err); // Reject the promise with the error
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    });
  };

  const getRandomItem = (arr) => {
    if (arr.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  // const getItem = ({arr, quID}: { arr: Question[]; quID: number }) => {
  //   if (arr.length === 0) return null;
  //   const randomIndex = Math.floor(Math.random() * arr.length);
  //   return arr[randomIndex];
  // };

  useEffect(() => {
    console.log("Mounted with quID:", quID);
    if (quID) fetchQuestion({quID: quID}).then(setQData);
    else fetchRandomQuestion().then(setQData);
  }, []);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const onPressNext = () => {
    fetchRandomQuestion().then(setQData);
    setHasVoted(false);
  }

  const onPressShow = () => {
    setHasVoted(true);
  }

  //todo add query
  function onVote(val: number) {
    let tempQData = questionData;

    if (val > 0) tempQData.yes_count = tempQData.yes_count + 1;
    if (val < 0) tempQData.yes_count = tempQData.no_count + 1;
    if (val === 0) tempQData.yes_count = tempQData.abstain_count + 1;

    setQData(tempQData);
    console.log(questionData);
    setHasVoted(true);
  }

  return (
    <div
      className="w-[375px] h-[812px] px-[27px] py-[49px] bg-[#354ca1] inline-flex flex-col justify-start items-center gap-7 overflow-hidden">
      <BackButton/>
      <Peruna size={1}/>
      <Card
        padding="600"
        direction="vertical"
        variant="stroke"
        asset={
          <div className={"flex gap-7 mx-auto"}>
            <div className={"h-full mx-auto w-full"}>
              <ResultPie data={questionData} isShown={hasVoted}/>
            </div>
          </div>
        }
      >
        <Flex direction="column" gap="300">
          <div className={"w-[265px] my-auto flex-wrap pt-5"}>
            <div
              className="text-black text-2xl font-bold font-['Inter']
            leading-[28.88px] text-balance
            break-words align-middle">
              {questionData.body}
            </div>
          </div>
        </Flex>
      </Card>

      <div className="top-[571px] left-[32px] flex gap-3">

        <IconButton
          aria-label="Disagree"
          className="bg-rose-700 hover:bg-gray-300 w-24 h-14 rounded-[32px] outline outline-[3px] outline-white"
          onPress={() => {
            onVote(-1)
          }}
        >
          <IconThumbsDown size="24"/>
        </IconButton>

        <IconButton
          aria-label="Neutral"
          className="bg-gray-500 hover:bg-gray-300 w-20 h-14 rounded-[32px] outline outline-[3px] outline-white"
          onPress={() => () => {
            onVote(0)
          }}
        >
          <IconMinusCircle size="24"/>
        </IconButton>

        <IconButton
          aria-label="Agree"
          className="bg-green-500 hover:bg-gray-300 w-24 h-14 rounded-[32px] outline outline-[3px] outline-white"
          onPress={() => {
            onVote(1)
          }}
        >
          <IconThumbsUp size="24"/>
        </IconButton>
      </div>

      <IconButton
        aria-label="Neutral"
        className="bg-gray-500 hover:bg-gray-300 w-20 h-14 rounded-[32px] outline outline-[3px] outline-white"
        onPress={() => {
          onPressNext()
        }}
      >
        <IconMinusCircle size="24"/>
      </IconButton>
    </div>

  );
}

export default Vote;


