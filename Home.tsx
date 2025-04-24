import {Card} from "compositions";
import {
  IconArrowRight,
  IconBookOpen,
  IconHelpCircle, IconLogOut,
  IconMessageCircle,
  IconPieChart,
  IconThumbsUp
} from "icons";
import {Logo} from "../components/Logo.tsx";
import {ComponentPropsWithoutRef, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthenticationContext} from "providers";

export type NavCardProps = ComponentPropsWithoutRef<"div"> & {
  asset?: React.ReactNode;
  title?: string;
  to?: string;
};

export function NavCard({
  asset,
  title,
  to
}: NavCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      padding={"600"}
      direction={"horizontal"}
      className = "cursor-pointer transition-colors duration-200 hover:bg-gray-300 rounded-x"
      onClick={() => to && navigate(to)}
    >
      <div className={"inline-flex justify-start items-center gap-3 flex-row content-center"}>
        <div className="h-[30px] inline-flex flex-col justify-start items-start">
          {asset}
        </div>

        <div data-layer="Body"
             className="Body w-[190px] flex justify-start items-center gap-2.5">
          <div data-layer="Text" className="Text w-[190px] h-[30px] relative flex-col">
            <div data-layer="Results"
                 className="Results w-[190px] left-0 top-0 absolute justify-start text-smuRed text-2xl font-semibold font-['Inter'] leading-[28.80px]">
              {title}
            </div>
          </div>
        </div>

        <div data-layer="arrow_forward" className="ArrowForward w-6 h-6 relative">
          <IconArrowRight size={"24"} fill={"stroke-neutral-900"}/>
        </div>
      </div>
    </Card>
  );
}

export const Home = () => {
  const auth = useContext(AuthenticationContext);

  return (
    <div data-layer="Home Page" className="HomePage w-[375px] h-[812px] relative">
      <div data-layer="Home" className="Home w-[375px] h-[812px] left-0 top-0 absolute bg-[#354ca1] overflow-hidden">
        <Logo/>
        <div data-layer="Frame 1"
             className="Frame1 w-[320px] left-[30px] top-[170px] flex mx-auto mt-44 flex-col justify-start items-start gap-[31px]">
          <NavCard
            asset={<IconHelpCircle size={"32"}/>}
            title={"Ask a Question"}
            to = "/submission"
          />

          <NavCard
            asset={<IconThumbsUp size={"32"}/>}
            title={"Vote"}
            to = "/vote"
          />

          <NavCard
            asset={<IconPieChart size={"32"}/>}
            title={"Results"}
            to = "/results"
          />

          <NavCard
            asset={<IconMessageCircle size={"32"}/>}
            title={"Chat With Stang"}
            to = "/chat"
          />

          <NavCard
            asset={<IconBookOpen size={"32"}/>}
            title={"About Us"}
            to = "/about"
          />

          {/*todo change title to logout*/}
          <NavCard
            asset={<IconLogOut size={"32"}/>}
            title ={auth.currentUser?.email ?? "cant access user"}
            to = "/login"
            onClick={() => auth.logout()}
          />

        </div>
      </div>
    </div>
  );
}

export default Home;