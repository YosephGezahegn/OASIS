import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../Assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftsection = () => {
  return (
    <div className="h-screen py-12 flex flex-col bg-stone-50 backdrop-blur-md shadow-md min-w-210 md:w-[350px] gap-3">
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={logo} alt="" className="w-[80px]" />
        <span className="text-2xl font-bold -ml-6">Pizza</span>
      </NavLink>
      <hr />
      <ul className="flex flex-col gap-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 text-sm border-stone-800 bg-white`
              : isNotActiveStyles
          }
          activeClassName="active"
          to={"/Dashboard/home"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 text-sm border-stone-800 bg-white`
              : isNotActiveStyles
          }
          activeClassName="active"
          to={"/Dashboard/Orders"}
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 text-md border-stone-800 bg-white`
              : isNotActiveStyles
          }
          activeClassName="active"
          to={"/Dashboard/Items"}
        >
          Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 text-sm border-stone-800 bg-white`
              : isNotActiveStyles
          }
          activeClassName="active"
          to={"/Dashboard/helpCenter"}
        >
          Help center
        </NavLink>
      </ul>
    </div>
  );
};

export default DBLeftsection;
