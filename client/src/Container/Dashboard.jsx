import React from "react";
import { DBLeftsection, DBrightSec } from "../Components";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center">
      <DBLeftsection />
      <DBrightSec />
    </div>
  );
};
export default Dashboard;
