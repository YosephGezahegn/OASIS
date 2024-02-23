import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { background, grey, pizza } from "../Assets";
import Logininput from "../Components/Logininput";
import { FaEnvelope, FaLock, FcGoogle } from "../Assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";

const Login = () => {
  const [userEmail, setuserEmai] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <img
          src={background}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 gap-6 bg-gray-400 bg-opacity-10 ">
          <p className="sm:text-3xl font-semibold text-white text-2xl">
            {isSignUp ? "Welcome to our page!" : "Welcome back!"}
          </p>
          <p className="text-sm text-white -mt-6">
            {isSignUp
              ? "Sign up with the following"
              : "Sign in with the following"}
          </p>

          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col items-center justify-center gap-3">
            <Logininput
              placeHolder={"Email here"}
              icon={<FaEnvelope className="text-xl" />}
              inputState={userEmail}
              inputStateFunc={setuserEmai}
              type="email"
              isSignUp={isSignUp}
              className="w-64 md:w-72 lg:w-80 xl:w-96"
            />
            <Logininput
              placeHolder={"Password here"}
              icon={<FaLock className="text-xl" />}
              inputState={password}
              inputStateFunc={setpassword}
              type="password"
              isSignUp={isSignUp}
              className="w-40 md:w-72 lg:w-80 xl:w-96"
            />
            {isSignUp && (
              <Logininput
                placeHolder={"Confirm password here"}
                icon={<FaLock className="text-xl" />}
                inputState={confirmPassword}
                inputStateFunc={setconfirmPassword}
                type="password"
                isSignUp={isSignUp}
                className="w-40 md:w-72 lg:w-80 xl:w-96"
              />
            )}

            {!isSignUp ? (
              <p className="text-white">
                Doesn't have an account,{" "}
                <motion.button
                  {...buttonClick}
                  className="text-blue-500 underline cursor-pointer bg-transparent"
                  onClick={() => setisSignUp(true)}
                >
                  Create one
                </motion.button>
              </p>
            ) : (
              <p className="text-white">
                Already have an account?{" "}
                <motion.button
                  {...buttonClick}
                  className="text-blue-500 underline cursor-pointer bg-transparent"
                  onClick={() => setisSignUp(false)}
                >
                  Click Here
                </motion.button>
              </p>
            )}
            <div className="flex flex-col items-center justify-center gap-6">
              {isSignUp ? (
                <motion.button
                  {...buttonClick}
                  className="flex items-center justify-center w-full h-[40px] rounded-3xl bg-orange-500 cursor-pointer text-white text-lg capitalize hover:bg-orange-400 transition-all duration-150"
                >
                  Sign up
                </motion.button>
              ) : (
                <motion.button
                  {...buttonClick}
                  className="flex items-center justify-center w-full h-[40px] rounded-3xl bg-orange-500 cursor-pointer text-white text-lg capitalize hover:bg-orange-400 transition-all duration-150"
                >
                  Sign In
                </motion.button>
              )}

              <div className="flex items-center justify-between w-full gap-16">
                <div className="w-full h-[1px] rounded-md bg-white"></div>
              </div>

              <motion.div
                {...buttonClick}
                className="flex items-center justify-center px-8 py-2 bg-gray-300 backdrop-blur-md cursor-pointer rounded-3xl gap-3"
              >
                <FcGoogle className="text-2xl" />
                <p className="capitalize text-lg font-semibold">
                  Sign in with Google
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
