import {Button, ButtonGroup, Form, TextareaField} from "primitives";
import BackButton from "../components/BackButton.tsx";
import {IconUpload} from "icons";
import React, {useContext, useState} from "react";
import {postData} from "../backend/api.ts";
import {navigate} from "@storybook/addon-links";
import {AuthenticationContext} from "providers";

function Submission() {
  const auth = useContext(AuthenticationContext);
  const userID = auth.currentUser?.id;
  const [error, setError] = useState("");

  let onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      question: { value: string };
    };

    const question = target?.question?.value;

    if (!question) {
      setError("Usually, questions include text. Try adding that!");
      return;
    }

    if (!userID) {
      setError("You aren't logged in!");
      return;
    }

    try {
      const data = await postData("post-question",
        {
          body: question,
          user_id: userID,
          yes_count: 0,
          no_count: 0,
          abstain_count: 0,
          created_at: new Date(Date.now()).toISOString()
        });

      console.log("Question posted with ID: ", data?.id);

      navigate("/home");

      if (data?.id) {
        navigate("/home");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (e) {
      console.error(e instanceof Error ? e.message : e);
      setError("Something broke lol.");
    }
  };

  return (
    <div
      data-layer="Submissions"
      className="Submissions w-[375px] h-[812px] p-4 bg-[#354CA1] overflow-hidden inline-flex flex-col justify-start items-center gap-3"
    >
      <BackButton/>

      <div
        data-layer="Layout"
        className="Layout mt-14 w-[296px] flex flex-col justify-start items-center gap-[25px]"
      >
        <div
          data-layer="What’s on your mind?"
          className="WhatSOnYourMind self-stretch text-center justify-center flex flex-col text-white text-[40px] font-['Playfair'] font-bold break-words"
        >
          What’s on your mind?
        </div>

        <Form
          className="flex flex-col justify-start items-start gap-[15px]"
          onSubmit={onSubmit}
        >
          <div className="w-[296px] flex flex-col justify-start gap-3">
            <div className="text-[#f2f2f2] font-bold font-['Inter']">Question</div>
            <TextareaField
              name={"question"}
              description={'Phrase your question as a yes or no question.\n e.g. “Is giving homework unethical?”'}
              aria-label={"Question"}
            />
          </div>

          {/*<FileUpload/>*/}

          {error && (
            <div className={"w-[250px] text-gray-300"}>
              {error}
            </div>
          )}

          <div
            data-layer="Submit"
            className="Submit w-[296px] flex flex-col justify-center items-end gap-2.5"
          >
            <Button
              size="medium"
              variant="primary"
              className="Button font-semibold"
              type={"submit"}
            >
              Submit Question
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Submission;