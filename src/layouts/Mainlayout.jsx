/** @format */

import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../components/header";

const MainLayout = () => {
  return (
    <div className='  '>
      <Header />
      <div className=' min-h-screen bg-orange-300'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
