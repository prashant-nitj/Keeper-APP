import React from "react";
import { colors } from "./data";
import { useTheme } from "../../context";
import "./ColorList.css";

export const ColorList = ({ handleColorListChange, activeColor }) => {
  const { theme } = useTheme();

  return (
    <>
      {colors.map((color, index) => (
        <span
          key={color.id}
          className="relative flex items-start justify-end tooltip"
        >
          <button
            type="button"
            className={`${
              activeColor === index ? "selected" : ""
            } color-picker cursor-pointer`}
            style={{
              backgroundColor: color[theme],
            }}
            onClick={() =>
              handleColorListChange("backgroundColor", color, index)
            }
          ></button>
          <span className="tooltip-text">{color.text}</span>
          <span
            className={`${
              activeColor === index ? "show-done-icon" : "hide-done-icon"
            } absolute material-symbols-outlined done-icon`}
          >
            done
          </span>
        </span>
      ))}
    </>
  );
};
