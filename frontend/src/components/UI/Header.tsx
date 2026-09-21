import { CircleUser } from "lucide-react";
import React from "react";
import { useUser } from "../../lib/auth";

const Header = () => {
  const { data } = useUser();
  return (
    <header className="w-full border-b p-4">
      <div className="flex items-center justify-end">
        <CircleUser /> <h2 >{data!.name}</h2>
      </div>
    </header>
  );
};

export default Header;
