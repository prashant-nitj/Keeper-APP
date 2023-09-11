import React from "react";
import { Link } from "react-router-dom";
import bulbImage from "../../assests/bulb.png";
import { useNotes, useTheme } from "../../context";
import { SET_SEARCH_QUERY, SET_TOGGLE_SIDEBAR } from "../../reducer";
import "./Navbar.css";

export const Navbar = () => {
  const { searchQuery, notesDispatch, toggle } = useNotes();
  const { theme, changeTheme } = useTheme();

  const clickHandler = () => {
    notesDispatch({
      type: SET_TOGGLE_SIDEBAR,
      payload: !toggle,
    });
  };

  return (
    <nav className="navbar flex justify-between items-center p-0 sticky top-0 left-0">
      <div className="navbar-brand flex items-center justify-even">
        <span
          onClick={() => clickHandler()}
          className="hamburger-menu material-icons-outlined cursor-pointer"
        >
          menu
        </span>
        <Link to="/">
          <img src={bulbImage} alt="Keeper App" />
        </Link>
        <Link to="/">
          <p className="text-white text-2xl cursor-pointer">Keeper</p>
        </Link>
      </div>

      <input
        className="navbar-search text-base rounded-lg border-none outline-none"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) =>
          notesDispatch({
            type: SET_SEARCH_QUERY,
            payload: e.target.value,
          })
        }
      ></input>
      <button
        className="theme-btn bg-inherit rounded-lg border-none text-white cursor-pointer tooltip"
        onClick={changeTheme}
      >
        <i
          className={`fa-solid ${theme === "light" ? "fa-moon" : "fa-sun"}`}
        ></i>
        <span className="tooltip-text">
          Change to {theme === "dark" ? "light" : "dark"}
        </span>
      </button>
    </nav>
  );
};
