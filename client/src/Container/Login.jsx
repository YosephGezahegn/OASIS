import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { background, grey, pizza } from "../Assets";
import Logininput from "../Components/Logininput";
import { FaEnvelope, FaLock, FcGoogle } from "../Assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { setUserDetails } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { alertInfo, alertWarning } from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setuserEmai] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };
  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirmPassword === "") {
      dispatch(alertInfo("Required fields should not be empty"));
    } else {
      if (password === confirmPassword) {
        setuserEmai("");
        setconfirmPassword("");
        setpassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        dispatch(alertWarning("Password doesn't match"));
      }
    }
  };
  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Password doesn't match"));
    }
  };

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden flex">
        <img
          src={background}
          alt=""
          className="absolute inset-0 w-full h-full object-cover md:w-1/3 md:relative"
        />

        <div className="absolute inset-0 md:relative flex-1 flex items-center justify-center p-8 gap-6 bg-gray-400 bg-opacity-10">
          <div className="max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col items-center justify-center gap-3">
            <p className="sm:text-3xl font-semibold text-white md:text-black text-2xl">
              {isSignUp ? "Welcome to our page!" : "Welcome back!"}
            </p>
            <p className="text-md text-white md:text-black -mt-3 mb-3">
              {isSignUp
                ? "Sign up with the following"
                : "Sign in with the following"}
            </p>
            <Logininput
              placeHolder={"Email here"}
              icon={<FaEnvelope className="text-xl" />}
              inputState={userEmail}
              inputStateFunc={setuserEmai}
              type="email"
              isSignUp={isSignUp}
              className="w-full md:w-72 lg:w-80 xl:w-96"
            />
            <Logininput
              placeHolder={"Password here"}
              icon={<FaLock className="text-xl" />}
              inputState={password}
              inputStateFunc={setpassword}
              type="password"
              isSignUp={isSignUp}
              className="w-full md:w-72 lg:w-80 xl:w-96"
            />
            {isSignUp && (
              <Logininput
                placeHolder={"Confirm password here"}
                icon={<FaLock className="text-xl" />}
                inputState={confirmPassword}
                inputStateFunc={setconfirmPassword}
                type="password"
                isSignUp={isSignUp}
                className="w-full md:w-72 lg:w-80 xl:w-96"
              />
            )}

            {!isSignUp ? (
              <p className="text-white md:text-black">
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
              <p className="text-white md:text-black">
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
                  onClick={signUpWithEmailPass}
                >
                  Sign up
                </motion.button>
              ) : (
                <motion.button
                  {...buttonClick}
                  onClick={signInWithEmailPass}
                  className="flex items-center justify-center w-full h-[40px] rounded-3xl bg-orange-500 cursor-pointer text-white text-lg capitalize hover:bg-orange-400 transition-all duration-150"
                >
                  Sign In
                </motion.button>
              )}

              <div className="flex items-center justify-between w-full gap-16">
                <div className="w-full h-[1px] rounded-md md:bg-black bg-white"></div>
              </div>

              <motion.div
                {...buttonClick}
                className="flex items-center justify-center px-8 py-2 bg-gray-300 backdrop-blur-md cursor-pointer rounded-3xl gap-3"
                onClick={loginWithGoogle}
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
