import {Card} from "compositions"
import {Flex} from "layout";
import {TextHeading, TextSmall} from "primitives";
import {Logo} from "../components/Logo.tsx";
import BackButton from "../components/BackButton.tsx";

function About () {
  const description =
    "Welcome to Hey Stangs!, the ethics app designed by SMU students to foster ethical discussions. Our AI model, Stang, generates responses to student-submitted questions, and users vote Agree, Disagree, or Neutral to refine its reasoning.";

  const description2 =
    "Our goal is to create a space where students can explore ethical dilemmas, understand different perspectives, and shape a more thoughtful SMU community.";


  return (
    <div
      className="w-[375px] h-[812px] px-[27px] py-[49px] bg-[#354ca1] inline-flex flex-col justify-start items-center gap-7 overflow-hidden">
      <BackButton/>
      <Logo/>
      <div className={"mt-32"}>
        <Card
          padding="600"
          direction="vertical"
          variant="stroke"
          asset={<img src={"/images/campus.png"} alt={"SMU's campus"}/>}
        >
          <Flex direction="column" gap="300">
            <TextHeading>
              <div data-layer="Results"
                   className="Results text-smuRed text-2xl font-semibold font-['Inter'] leading-[28.80px]">
                About Us
              </div>

            </TextHeading>
            <TextSmall>{description}</TextSmall>
            <TextSmall>{description2}</TextSmall>
          </Flex>
        </Card>
      </div>

    </div>
  );
}

export default About;