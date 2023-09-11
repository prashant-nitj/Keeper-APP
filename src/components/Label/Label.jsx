import React, { useState } from "react";
import { LabelList } from "./LabelList";
import { ADD_LABEL } from "../../reducer";
import { useNotes } from "../../context";
import "./Label.css";

export const Label = ({ openLabelModal, setOpenLabelModal }) => {
  const [labelInput, setLabelInput] = useState("");
  const [openLabelInput, setOpenLabelInput] = useState(false);
  const { notesDispatch, labels } = useNotes();

  const handleLabelClick = () => {
    notesDispatch({
      type: ADD_LABEL,
      payload: labelInput,
    });
    setLabelInput("");
    setOpenLabelInput(false);
  };

  return (
    <div className="label-container">
      <div
        className={`${
          openLabelModal && "show-modal-bg"
        } label-modal-bg flex justify-center items-center w-screen h-screen fixed inset-0`}
      >
        <div className="label-modal-content relative flex flex-col justify-center items-start px-4 py-3 rounded-lg border-base text-white">
          <p className="labels-header">Edit Labels</p>
          <div className="label-form flex">
            {openLabelInput === true ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setLabelInput(e.target.value)}
                  value={labelInput}
                  className="label-input border-none outline-none"
                />
                <button
                  className="add-label-btn rounded-lg text-white bg-inherit border-none cursor-pointer"
                  onClick={() => handleLabelClick()}
                >
                  <span className="text-base material-symbols-outlined">
                    check
                  </span>
                </button>
              </>
            ) : (
              <button
                type="button"
                className="add-label-btn rounded-lg text-white bg-inherit border-none cursor-pointer"
                onClick={() => setOpenLabelInput(true)}
              >
                <span className="text-base material-symbols-outlined">
                  add_circle
                </span>
              </button>
            )}
          </div>

          {labels &&
            labels.map(({ id, labelName }) => (
              <div className="labels-list w-full" key={id}>
                <LabelList id={id} labelName={labelName} />
              </div>
            ))}
          <hr className="w-full" />
          <div className="w-full flex justify-end item-center">
            <button
              type="button"
              className="modal-close-btn rounded-lg text-white bg-inherit border-none border-base cursor-pointer"
              onClick={() => setOpenLabelModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
