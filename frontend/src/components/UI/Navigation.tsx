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

const linkBase =
  "flex min-w-0 items-center gap-2.5 rounded-xl px-1.5 py-2 whitespace-nowrap md:px-3.5 md:py-3";

const Navigation = () => {
  return (
    <nav className="flex w-full justify-center">
      <ul className="flex w-full justify-around gap-1 md:w-full md:flex-col md:justify-center">
        {navLinks.map(({ name, to, icon: Icon }) => (
          <li key={to} className="min-w-0 flex-1 md:flex-none">
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? `${linkBase} flex-col bg-primary-soft font-bold text-primary-strong md:flex-row`
                  : `${linkBase} flex-col text-text-muted md:flex-row`
              }
            >
              <Icon size={20} className="shrink-0" />
              <span className="min-w-0 truncate text-[10px] leading-4 md:text-sm md:leading-normal">
                {name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
