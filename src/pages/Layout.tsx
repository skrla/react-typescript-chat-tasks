import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Alert from "../components/Alert";

function Layout() {
  return (
    <div className="h-[100vh] flex flex-col">
      <Header />
      <div className="bg-pattern bg-cover flex-1 max-h-[100%] overflow-y-scroll no-scrollbar">
          <Outlet />
      </div>
      <Alert />
    </div>
  );
}

export default Layout;
