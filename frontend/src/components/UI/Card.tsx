import React from "react";

export interface CardProps {
  title: string;
  data: string;
  subTitle: string;
  children: React.ReactNode;
  className?: string;
}
const Card = ({ title, data, subTitle, children, className }: CardProps) => {
  return (
    <div
      className={` flex flex-col justify-start text-left items-start p-4 w-full border rounded-2xl ${className}`}
    >
      <h3 className="border-b w-full">{title}</h3>
      <div className="w-full flex justify-between">
        <div className="">
          <h2>{data}</h2>
          <p>{subTitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
