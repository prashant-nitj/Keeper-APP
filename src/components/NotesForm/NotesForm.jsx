import React, { useState } from "react";
import { useNotes, useTheme } from "../../context";
import { ColorList } from "../ColorList/ColorList";
import { Label } from "../Label/Label";
import { useToast } from "../../hooks/showToast";
import { HANDLE_SUBMIT } from "../../reducer";
import "./NotesForm.css";

export const NotesForm = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { notesDispatch, labels } = useNotes();
  const [openLabelModal, setOpenLabelModal] = useState(false);
  const [displayColorPalette, setDisplayColorPalette] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const [notes, setNotes] = useState({
    title: "",
    content: "",
    label: [],
    backgroundColor: null ?? { dark: "#121212", light: "#ffffff" },
  });

  const handleChange = (e, field) => {
    setNotes((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    notesDispatch({
      type: HANDLE_SUBMIT,
      payload: {
        title: notes.title,
        content: notes.content,
        label: labels,
        backgroundColor: notes.backgroundColor,
      },
    });

    showToast("success", "New Note has been added");
    setActiveColor(0);

    setNotes({
      title: "",
      content: "",
      backgroundColor: null ?? { dark: "#121212", light: "#ffffff" },
    });
  };

  const handleColorListChange = (obj, property, index) => {
    setActiveColor(index);
    setNotes((prev) => ({ ...prev, [obj]: property }));
  };

  const colorPaletteHandler = () => {
    setDisplayColorPalette((prev) => !prev);
  };

  return (
    <div className="form-container">
      <form
        style={{ backgroundColor: notes.backgroundColor[theme] }}
        className="form-area flex flex-col justify-center items-start rounded-lg border-base"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          required
          className="form-input w-full text-2xl bg-inherit rounded-lg text-white border-none outline-none px-4 py-3"
          type="text"
          placeholder="Title"
          value={notes.title}
          onChange={(e) => handleChange(e, "title")}
        />
        <textarea
          required
          className="text-input-area w-full text-base bg-inherit text-white border-none outline-none text-base px-4 py-3"
          placeholder="Take a note"
          value={notes.content}
          onChange={(e) => handleChange(e, "content")}
        ></textarea>
        <div className="flex flex-wrap px-4 py-3">
          {labels &&
            labels.map(({ id, labelName }) => (
              <div
                key={id}
                className="notesform-labels-list flex justify-center items-center border-base cursor-pointer"
              >
                <span>{labelName}</span>
              </div>
            ))}
        </div>
        <div className="w-full relative flex justify-between items-center">
          <div>
            <button className="add-btn rounded-lg text-white bg-inherit px-4 py-3 border-base cursor-pointer">
              Add
            </button>
            <button
              type="button"
              className="label-btn rounded-lg text-white bg-inherit px-4 py-3 border-base cursor-pointer"
              onClick={() => setOpenLabelModal(true)}
            >
              Edit labels
            </button>
            <Label
              openLabelModal={openLabelModal}
              setOpenLabelModal={setOpenLabelModal}
            />
          </div>
          <span
            onClick={() => colorPaletteHandler()}
            className="color-palette-icon cursor-pointer material-symbols-outlined"
          >
            palette
          </span>
          <div
            className={`${
              displayColorPalette ? "color-palette-container" : "hide"
            } mr-0 flex items-center justify-center`}
          >
            <ColorList
              activeColor={activeColor}
              handleColorListChange={handleColorListChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
