import React from "react";

export interface SmallCardProps {
  title: string;
  data: string;
  unit?: string;
  subTitle: string;
  children?: React.ReactNode; // ikona
  iconClassName?: string;
  className?: string;
}

const SmallCard = ({
  title,
  data,
  unit,
  subTitle,
  children,
  iconClassName = "bg-primary-soft text-primary",
  className = "",
}: SmallCardProps) => {
  return (
    <div
      className={`w-full rounded-2xl border border-border bg-surface p-5 text-left ${className}`}
    >
      <div className="flex items-center gap-3">
        {children && (
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
          >
            {children}
          </span>
        )}
        <h3>{title}</h3>
      </div>

      <div className="mt-2.5 flex flex-col gap-1">
        <p className="stat-value">
          {data}
          {unit && <span className="unit ml-1.5">{unit}</span>}
        </p>
        <p className="small">{subTitle}</p>
      </div>
    </div>
  );
};

export default SmallCard;