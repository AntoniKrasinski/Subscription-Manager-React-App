import React from "react";
import Navigation from "../UI/Navigation";
import Header from "../UI/Header";
import Logo from "../UI/Logo";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/5 h-full border-r">
        <Logo />
        <Navigation />
      </div>
      <div className="flex flex-col w-4/5">
        <Header />
        <div className="p-8 space-y-8 ">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
