import React from "react";

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button className="p-2 border" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
