import {FormBox} from "compositions"
import {TextLink} from "primitives"
import {ButtonGroup} from "primitives"
import {Button} from "primitives"
import {InputField} from "primitives"
import {Peruna} from "../components/Logo.tsx"
import {useNavigate} from "react-router-dom";
import {AuthenticationContext} from "providers";
import React, {useContext, useEffect, useRef, useState} from "react";
import {getData, postData} from "../backend/api.ts";

function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthenticationContext);
  const [error, setError] = useState("");

  const authRaw = localStorage.getItem('auth');
  const authData = authRaw ? JSON.parse(authRaw) : null;

  useEffect(() => {
    if (authData?.currentUser) {
      console.log("login", authData?.currentUser);
      navigate("/home");
    }
  }, []);

  let onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    // Email regex validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const data = await postData("login", { email, password });

      console.log("Response:", data.message);

      if (data.user) {
        // alert("Login successful!");
        auth.login({ email: data.user.email, id: data.user.id });
        navigate("/home");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (e) {
      console.error(e instanceof Error ? e.message : e);
      setError("Incorrect email or password.");
    }
  };

  return (
    <div
      className="w-[375px] h-[812px] px-[27px] py-[49px] bg-[#354ca1] inline-flex flex-col justify-start items-center gap-7 overflow-hidden">
      <Peruna/>
      <div className="text-center justify-center text-white text-[64px] font-bold font-['Playfair']">Log In</div>
      <FormBox onSubmit={onSubmit}>
        <InputField label="Email" placeholder="Value" type={"email"} name={"email"}/>
        <InputField label="Password" placeholder="Value" type={"password"} name={"password"}/>
        {error && (
          <div className={"w-[250px] text-smuRed"}>
            {error}
          </div>
        )}
        <ButtonGroup align="justify">
          <Button type={"submit"} variant="primary">
            Sign In
          </Button>
        </ButtonGroup>

        <TextLink href="/forget" className={"text-[#354ca1]"}>Forgot password?</TextLink>
      </FormBox>
    </div>
  );
}

export default Login;