import React from "react";
import Navigation from "../UI/Navigation";
import Header from "../UI/Header";
import Logo from "../UI/Logo";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen">
      <aside className="w-1/7 items-center flex flex-col h-full border-r">
        <Logo />
        <Navigation />
      </aside>
      <div className="flex flex-col w-6/7 h-full">
        <Header />
        <main className="mx-auto w-full max-w-7xl p-8 space-y-8">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
