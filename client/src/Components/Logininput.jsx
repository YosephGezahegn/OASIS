import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeHolder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
}) => {
  const [isFocus, setisFocus] = useState(false);
  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 backdrop-blur-md rounded-md w-60 md:w-72 lg:w-80 xl:w-96 px-4 py-2 bg-gray-300 ${
        isFocus ? "shadow-md shadow-orange-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-60 md:w-72 lg:w-80 xl:w-96 bg-transparent text-md font-regular border-none outline-none"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setisFocus(true)}
        onBlur={() => setisFocus(false)}
      />
    </motion.div>
  );
};
export default LoginInput;
