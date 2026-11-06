import React from "react";

type ToggleProps<T extends string> = {
  options: [T, T];
  value: T;
  onChange: (value: T) => void;
};

const Toggle = <T extends string>({
  options,
  value,
  onChange,
}: ToggleProps<T>) => {
  return (
    <div className="flex items-center rounded-full bg-primary-soft p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`min-w-16 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            value === option
              ? "bg-primary text-white shadow-sm"
              : "text-text-muted"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Toggle;
