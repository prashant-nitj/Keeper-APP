import React, { useState } from "react";
import { useNotes } from "../../context";
import { EDIT_LABEL, REMOVE_LABEL } from "../../reducer";
import "./Label.css";

export const LabelList = ({ id, labelName }) => {
  const { notesDispatch } = useNotes();
  const [labelEditInput, setLabelEditInput] = useState("");
  const [editInputLocalState, setEditInputLocalState] = useState(false);

  const deleteLabelHandler = () => {
    notesDispatch({
      type: REMOVE_LABEL,
      payload: id,
    });
  };

  const editLabelToggler = () => {
    setLabelEditInput(labelName);
    setEditInputLocalState(true);
  };

  const editLabelHandler = () => {
    notesDispatch({
      type: EDIT_LABEL,
      payload: {
        id: id,
        labelName: labelEditInput,
      },
    });
    setEditInputLocalState(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="delete-label-btn bg-inherit text-white border-none cursor-pointer"
          onClick={() => deleteLabelHandler()}
        >
          <span className="text-base material-symbols-outlined">delete</span>
        </button>
        {editInputLocalState === true ? (
          <input
            value={labelEditInput}
            onChange={(e) => setLabelEditInput(e.target.value)}
            className="label-input border-none outline-none"
          />
        ) : (
          <span className="label-name text-base">{labelName}</span>
        )}
      </div>
      <button
        type="button"
        className="edit-label-btn bg-inherit text-white border-none cursor-pointer"
        onClick={() => {
          editInputLocalState === true
            ? editLabelHandler()
            : editLabelToggler();
        }}
      >
        {editInputLocalState === true ? (
          <span className="text-base material-symbols-outlined">check</span>
        ) : (
          <span className="text-base material-symbols-outlined">edit</span>
        )}
      </button>
    </div>
  );
};
