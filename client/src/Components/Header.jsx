import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logo } from "../Assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { MdLogout, MdShoppingCart } from "../Assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "flowbite-react";

import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userActions";
import { getAuth } from "firebase/auth";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMenu, setisMenu] = useState(false);
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
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={logo} alt="" className="w-[80px]" />
        <span className="text-2xl font-bold -ml-6">Pizza</span>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/Services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/Contact"}
          >
            Contact
          </NavLink>
        </ul>
        <motion.div {...buttonClick} className="relative cursor-pointer">
          <MdShoppingCart className="text-2xl text-gray-700" />
          <div className="w-5 h-5 rounded-full bg-green-200 flex items-center justify-center absolute -top-4 -right-1">
            <p className="font-bold text-sm ">2</p>
          </div>
        </motion.div>

        {user ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setisMenu(true)}
            >
              <div className="w-10 h-10 mb-3 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.1 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  onMouseLeave={() => setisMenu(false)}
                  className="w-48 px-6 py-4 bg-gray-200 backdrop-blur-md shadow-md rounded-md absolute top-12 right-0 flex flex-col gap-4"
                >
                  <Link
                    to={"/dashboard"}
                    className="hover:text-blue-500 text-sm"
                  >
                    Dashboard
                  </Link>
                  <Link to={"#"} className="hover:text-blue-500 text-sm">
                    My Profile
                  </Link>
                  <Link to={"#"} className="hover:text-blue-500 text-sm">
                    Orders
                  </Link>
                  <hr />
                  <motion.div
                    onClick={signOut}
                    {...buttonClick}
                    className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-200 hover:bg-gray-300 gap-3"
                  >
                    <MdLogout className="text-2xl group-hover::text-red-500" />
                    <p>Sign Out</p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/Login"}>
              <motion.button
                {...buttonClick}
                className="px-6 py-1 bg-orange-300 rounded-md shadow-md border border-gray-400 cursor-pointer"
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
