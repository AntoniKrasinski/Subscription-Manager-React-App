import React from "react";
import { NavLink } from "react-router";

const navLinks: { name: string; to: string }[] = [
  {
    name: "Dashboard",
    to: "/dashboard",
  },
  {
    name: "Subscriptions",
    to: "/subscriptions",
  },
  {
    name: "Statistics",
    to: "/statistics",
  },
  {
    name: "Settings",
    to: "/settings",
  },
];

const Navigation = () => {
  return (
    <nav className="">
      <ul>
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active text-blue-900" : ""
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
