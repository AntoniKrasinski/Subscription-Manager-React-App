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
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/20 p-3 backdrop-blur-sm sm:p-6"
    >
      <div
        className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-surface p-4 shadow-xl sm:max-h-[calc(100dvh-3rem)] sm:p-6 lg:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
