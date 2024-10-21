import React from "react";
import { useState } from "react";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlesubmit = (event) => {
    event.preventDefault();
    console.log("It is clicked");
    console.log(email);
    console.log(password);
  };
  return (
    <>
      <div className="min-h-screen w-screen bg-[#D6FF00] flex justify-center items-center">
        <div className=" h-[90%] w-[100%] md:h-[60vh] md:w-[40vw] bg-white rounded-2xl flex justify-center items-center">
          <h2 className="p-4 bg-[#34E27A] text-white text-2xl text-center transform -rotate-90 mx-3">
            SignUp
          </h2>
          <form
            action="post"
            onSubmit={handlesubmit}
            className=" h-[100%] w-[100%] bg-[#00b9f1] p-10 flex flex-col items-center justify-center gap-10"
          >
            <label htmlFor="UserName">
              <input
                type="email"
                id="E-mail"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white rounded-md h-10 w-60 p-4"
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white rounded-md h-10 w-60 p-4"
              />
            </label>
            <div className="h-10 w-60 flex flex-row gap-12 items-center mt-6">
              <button className="bg-white rounded-md p-3">
                forgot password
              </button>
              <button type="submit" className="bg-white rounded-md p-6">
                Go
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
