import React from "react";
import Navigation from "../UI/Navigation";
import Header from "../UI/Header";
import Logo from "../UI/Logo";
import LogOutButton from "../../features/auth/components/UI/LogOutButton";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full flex-col md:h-dvh md:min-h-0 md:flex-row">
      <aside className="hidden w-56 shrink-0 flex-col items-center border-r border-border bg-surface p-5 lg:w-64 lg:p-8 md:flex">
        <div className="flex h-full w-full flex-col items-center">
          <Logo />
          <Navigation />
        </div>
        <LogOutButton />
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="shrink-0">
          <Header />
        </div>

        <main className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col gap-5 overflow-x-hidden overflow-y-auto p-4 pb-24 sm:p-6 sm:pb-24 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] md:hidden">
        <Navigation />
      </div>
    </div>
  );
};

export default AppLayout;
