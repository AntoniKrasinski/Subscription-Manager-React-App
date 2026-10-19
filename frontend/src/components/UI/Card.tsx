import React from "react";

export interface CardProps {
  title: string;
  action?: React.ReactNode; // np. link "View all →"
  children?: React.ReactNode;
  className?: string;
}

const Card = ({ title, action, children, className = "" }: CardProps) => {
  return (
    <section
      className={`flex w-full flex-col rounded-2xl border border-border bg-surface p-5 text-left ${className}`}
    >
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <h2 className="m-0">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
};

export default Card;
