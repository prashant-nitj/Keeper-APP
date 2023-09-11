import React, { useState } from "react";
import { sidebarNames } from "./data";
import { useNotes } from "../../context";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  const [active, setActive] = useState(0);
  const { toggle } = useNotes();

  const handleSidebarClick = (listIdx) => {
    setActive(listIdx);
  };

  return (
    <div
      className={`${toggle ? "hide-list" : "show-list"} sidebar flex flex-col`}
    >
      {sidebarNames.map(({ id, sidebarName, iconName, path }, idx) => (
        <NavLink to={path} key={id}>
          <ul
            onClick={() => handleSidebarClick(idx)}
            className={`${
              active === idx && "active"
            } sidebar-show flex items-center text-base cursor-pointer`}
          >
            <span className="sidebar-icon material-icons-outlined">
              {iconName}
            </span>
            <li className={`${toggle ? "hide-names" : "show-names"}`}>
              {sidebarName}
            </li>
          </ul>
        </NavLink>
      ))}
    </div>
  );
};
