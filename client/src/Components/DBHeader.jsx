import { motion } from "framer-motion";
import React from "react";
import { BsFillBellFill, BsToggles2 } from "react-icons/bs";
import { MdLogout, MdSearch } from "react-icons/md";
import { buttonClick } from "../animations";
import { Avatar } from "flowbite-react";
import { getAuth } from "@firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUserNull } from "../context/actions/userActions";

const DBHeader = () => {
  const user = useSelector((state) => state.user);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/Login", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex items-center px-8 py-1 justify-start gap-4">
      <div className="flex items-center justify-start border border-gray-200 rounded-lg px-6 ml-20 backdrop-blur-md shadow-md">
        <MdSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search..."
          className="rounded-lg border-none focus:outline-none focus:ring-0"
        />
        <BsToggles2 className="text-gray-500 text-xl" />
      </div>
      <motion.div
        {...buttonClick}
        className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-gray-200 backdrop-blur-md shadow-md text-gray-700 "
      >
        <BsFillBellFill />
      </motion.div>
      <div className="flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden">
          <motion.img
            className="w-full h-full object-cover"
            src={user?.picture ? user?.picture : Avatar}
            whileHover={{ scale: 1.35 }}
            referrerPolicy="no-referrer"
          ></motion.img>
        </div>
        <motion.div
          {...buttonClick}
          onClick={signOut}
          className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-gray-200 backdrop-blur-md shadow-md "
        >
          <MdLogout />
        </motion.div>
      </div>
    </div>
  );
};

export default DBHeader;
