import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";

const Layout = () => {
  return (
    <div className="flex w-full overflow-hidden">
      <Aside />
      <div className="flex flex-col w-full h-[100vh]">
        <div>
          {/* <Header /> */}
        </div>
        <div className="px-[32px] py-[32px] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
