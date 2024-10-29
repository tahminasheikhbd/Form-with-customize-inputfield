/** @format */

import React from "react";
import { Link, NavLink } from "react-router-dom";
const navlinks = [
  {
    label: "Form-1",
    href: "/",
  },
  {
    label: "Form-2",
    href: "/form2",
  },

  {
    label: "Customize Checkbox",
    href: "/cusomizeCheckbox",
  },
  {
    label: "Customize Select Field",
    href: "/CustomizeSelectField",
  },
  {
    label: "Model Popup",
    href: "/modelpopup",
  },
];

const Header = () => {
  return (
    <ul className='bg-gradient-to-r from-teal-600  via-fuchsia-50  to-teal-600   top-0 left-0 h-20   right-0 border-b-2 border-b-teal-600'>
      <nav className='justify-between max-w-[1000px] mx-auto py-6 flex items-center '>
        {navlinks.map((link) => (
          <li key={link.href} className=''>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `hover:text-lime-800 font-semibold  py-[13px] px-4 transition ${
                  isActive && "text-lime-800  rounded-lg bg-white/30"
                }`
              }>
              {link.label}{" "}
            </NavLink>
          </li>
        ))}
      </nav>
    </ul>
  );
};

export default Header;
