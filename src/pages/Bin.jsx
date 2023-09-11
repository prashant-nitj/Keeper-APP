import React, { useState } from "react";
import { useNotes, useTheme } from "../context";
import { useToast } from "../hooks/showToast";
import { DELETE_FOREVER, MOVE_TO_ARCHIVE_FROM_BIN } from "../reducer";

export const Bin = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [selectPosition, setSelectPosition] = useState();
  const { binList, notesDispatch, searchQuery } = useNotes();

  const selectBinHandler = (idx) => {
    selectPosition === idx ? setSelectPosition() : setSelectPosition(idx);
  };

  const moveToArchiveHandler = (id, title, content, label, backgroundColor) => {
    notesDispatch({
      type: MOVE_TO_ARCHIVE_FROM_BIN,
      payload: {
        id: id,
        title: title,
        content: content,
        label: label,
        backgroundColor: backgroundColor,
      },
    });
    showToast("info", "Note moved to archive");
  };

  const deleteForeverHandler = (id) => {
    notesDispatch({
      type: DELETE_FOREVER,
      payload: id,
    });
    showToast("success", "Note is successfully deleted");
  };

  return (
    <div className="flex justify-start content-start flex-wrap">
      {binList.length > 0 ? (
        binList
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
              onClick={() => selectBinHandler(index)}
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
              <div className="flex items-center justify-between">
                <button className="tooltip bg-inherit text-white border-none cursor-pointer">
                  <span
                    className={`${
                      selectPosition === index
                        ? "show-done-icon"
                        : "hide-done-icon"
                    } archive-icon py-3 material-symbols-outlined`}
                    onClick={() =>
                      moveToArchiveHandler(
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
                  <span className="tooltip-text">Archive</span>
                </button>
                <button className="tooltip bg-inherit text-white border-none cursor-pointer">
                  <span
                    className={`${
                      selectPosition === index
                        ? "show-done-icon"
                        : "hide-done-icon"
                    } archive-icon py-3 material-symbols-outlined`}
                    onClick={() => deleteForeverHandler(id)}
                  >
                    delete_forever
                  </span>
                  <span className="tooltip-text">Delete Forever</span>
                </button>
              </div>
            </div>
          ))
      ) : (
        <div className="flex flex-col justify-center items-center h-full m-auto">
          <span className="archive-icon-lg material-symbols-outlined">
            delete
          </span>
          <h3 className="archive-text-lg">No notes in Recycle Bin</h3>
        </div>
      )}
    </div>
  );
};
