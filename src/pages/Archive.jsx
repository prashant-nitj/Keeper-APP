import React, { useState } from "react";
import { useNotes, useTheme } from "../context";
import { useToast } from "../hooks/showToast";
import { RESET_ARCHIVE_NOTE } from "../reducer";

export const Archive = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { archiveList, searchQuery, notesDispatch } = useNotes();
  const [selectPosition, setSelectPosition] = useState();

  const selectArchiveHandler = (idx) => {
    selectPosition === idx ? setSelectPosition() : setSelectPosition(idx);
  };

  const resetArchiveHandler = (id, title, content, label, backgroundColor) => {
    notesDispatch({
      type: RESET_ARCHIVE_NOTE,
      payload: {
        id: id,
        title: title,
        content: content,
        label: label,
        backgroundColor: backgroundColor,
      },
    });
    showToast("success", "Note successfully moved to home page");
  };

  return (
    <div className="flex justify-start content-start flex-wrap">
      {archiveList.length > 0 ? (
        archiveList
          .filter((note) => {
            return !searchQuery
              ? note
              : note.title.toLowerCase().includes(searchQuery.toLowerCase());
          })
          .map(({ id, title, content, label, backgroundColor }, index) => (
            <div
              style={{ backgroundColor: backgroundColor[theme] }}
              key={id}
              className={`${
                selectPosition === index && "border-lg"
              } note rounded-lg relative w-full px-4 py-3 border-base cursor-pointer`}
              onClick={() => selectArchiveHandler(index)}
            >
              <h3>{title}</h3>
              <p>{content}</p>
              <div className="flex flex-wrap justify-start content-start cursor-pointer">
                {label &&
                  label.map(({ id, labelName }) => (
                    <span className="archive-labels-list" key={id}>
                      {labelName}
                    </span>
                  ))}
              </div>
              <span
                className={`${
                  selectPosition === index
                    ? "select-archive-icon absolute"
                    : "hide-done-icon"
                }  material-symbols-outlined`}
              >
                done
              </span>
              <button className="bg-inherit border-none cursor-pointer text-white tooltip">
                <span
                  className={`${
                    selectPosition === index
                      ? "show-done-icon"
                      : "hide-done-icon"
                  } archive-icon py-3 material-symbols-outlined tooltip`}
                  onClick={() =>
                    resetArchiveHandler(
                      id,
                      title,
                      content,
                      label,
                      backgroundColor
                    )
                  }
                >
                  archive
                </span>
                <span className="tooltip-text">Unarchive</span>
              </button>
            </div>
          ))
      ) : (
        <div className="flex flex-col justify-center items-center h-full m-auto">
          <span className="archive-icon-lg material-symbols-outlined">
            archive
          </span>
          <h3 className="archive-text-lg">Your archive notes appear here</h3>
        </div>
      )}
    </div>
  );
};
