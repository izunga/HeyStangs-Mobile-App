import { FormBox } from "compositions"
import { Label } from "primitives"
import { ButtonGroup } from "primitives"
import { Button } from "primitives"
import { InputField } from "primitives"
import { Peruna } from "../components/Logo.tsx"
import {useNavigate} from "react-router-dom";
import BackButton from "../components/BackButton.tsx";

function Forget () {
  const navigate = useNavigate();

  return (
    <div
      className="w-[375px] h-[812px] px-[27px] py-[49px] bg-[#354ca1] inline-flex flex-col justify-start items-center gap-7 overflow-hidden">
      <BackButton/>
      <Peruna/>
      <div className="text-center justify-center text-white text-[64px] font-bold font-['Playfair']">
        Password Reset
      </div>
      <FormBox onSubmit={() => {}}>
        <Label>
          Enter the email you signed up with. We'll send you a link to log in and reset your password.
        </Label>
        <InputField label= "Email" placeholder="Value"/>
        <ButtonGroup align="justify">
          {/*gotta add authentication here*/}
          <Button onPress={() => {
            navigate("/login")
          }} variant="primary">
            Send Link
          </Button>
        </ButtonGroup>
      </FormBox>
    </div>
  );
}

export default Forget;