import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

export const Layout = () => {
  return (
    <div className="container">
      <Sidebar />
      <Outlet />
    </div>
  );
};
