import React from "react";
import Navigation from "../UI/Navigation";
import Header from "../UI/Header";
import Logo from "../UI/Logo";
import LogOutButton from "../../features/auth/components/UI/LogOutButton";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen ">
      <aside className="w-1/7 items-center flex flex-col h-full border-r border-border bg-surface p-8">
        <div className="flex flex-col items-center w-full h-full">
          <Logo />
          <Navigation />
        </div>
        <LogOutButton />
      </aside>
      <div className="flex flex-col w-6/7 h-full">
        <Header />
        <main className="mx-auto w-full max-w-[1440px] p-8 space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
