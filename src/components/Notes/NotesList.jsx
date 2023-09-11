import React, { useState } from "react";
import { useNotes, useTheme } from "../../context";
import { Modal } from "../Modal/Modal";
import "./NotesList.css";

export const NotesList = () => {
  const { notesList, searchQuery } = useNotes();
  const { theme } = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    id: "",
    title: "",
    content: "",
    label: [],
    backgroundColor: null ?? { dark: "#121212", light: "#ffffff" },
  });

  const clickHandler = (id, title, content, label, backgroundColor) => {
    setModalForm({
      id: id,
      title: title,
      content: content,
      label: label,
      backgroundColor: backgroundColor,
    });

    setOpenModal(true);
  };

  return (
    <div className="notes-list-container flex justify-center content-start flex-wrap relative">
      {notesList &&
        notesList
          .filter((note) => {
            return !searchQuery
              ? note
              : note.title.toLowerCase().includes(searchQuery.toLowerCase());
          })
          .map(({ id, title, content, label, backgroundColor }) => (
            <div
              style={{ backgroundColor: backgroundColor[theme] }}
              key={id}
              className="note rounded-lg relative w-full px-4 py-3 border-base cursor-pointer"
              onClick={() =>
                clickHandler(id, title, content, label, backgroundColor)
              }
            >
              <h3>{title}</h3>
              <p>{content}</p>
              <div className="note-overlay absolute flex items-center justify-between">
                <button className="tooltip">
                  <span className="material-icons-outlined">archive</span>
                  <span className="tooltip-text">Archive</span>
                </button>
                <button>
                  <span className="material-icons-outlined">add_alert</span>
                </button>
                <button className="tooltip">
                  <span className="material-icons-outlined">mode_edit</span>
                  <span className="tooltip-text">Edit</span>
                </button>
              </div>
            </div>
          ))}
      <Modal
        modalForm={modalForm}
        openModal={openModal}
        setModalForm={setModalForm}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};
