import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  CreditCard,
  ChartNoAxesColumn,
  SlidersVertical,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navLinks: { name: string; to: string; icon: LucideIcon }[] = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Subscriptions",
    to: "/subscriptions",
    icon: CreditCard,
  },
  {
    name: "Statistics",
    to: "/statistics",
    icon: ChartNoAxesColumn,
  },
  {
    name: "Settings",
    to: "/settings",
    icon: SlidersVertical,
  },
];

const linkBase = "flex items-center gap-2.5 rounded-xl px-3.5 py-3";

const Navigation = () => {
  return (
    <nav className="w-full flex justify-center">
      <ul className="w-[80%] justify-center flex flex-col gap-1">
        {navLinks.map(({ name, to, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? `${linkBase} bg-primary-soft font-bold text-primary-strong`
                  : `${linkBase} text-text-muted`
              }
            >
              <Icon size={18} />
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
