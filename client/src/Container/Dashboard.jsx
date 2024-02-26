import React from "react";
import { DBLeftSection, DBRightSection } from "../Components";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};
export default Dashboard;
