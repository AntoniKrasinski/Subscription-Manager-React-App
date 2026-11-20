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
      className={`small-card w-full rounded-2xl border border-border bg-surface p-3 text-left sm:p-4 xl:p-5 ${className}`}
    >
      <div className="small-card-header flex items-center gap-2 sm:gap-3">
        {children && (
          <span
            className={`small-card-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9 sm:rounded-xl xl:h-10 xl:w-10 ${iconClassName}`}
          >
            {children}
          </span>
        )}
        <h3>{title}</h3>
      </div>

      <div className="mt-2 flex flex-col gap-1 sm:mt-2.5">
        <p className="small-card-value stat-value">
          {data}
          {unit && <span className="unit ml-1.5">{unit}</span>}
        </p>
        <p className="small small-card-subtitle">{subTitle}</p>
      </div>
    </div>
  );
};

export default SmallCard;