import React from "react";

const ModalLayout = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <div className="border bg-active-bg p-8 w-1/3" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
