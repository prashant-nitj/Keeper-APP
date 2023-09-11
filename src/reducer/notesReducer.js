import {
  HANDLE_SUBMIT,
  HANDLE_EDIT,
  SET_SEARCH_QUERY,
  SET_TOGGLE_SIDEBAR,
  ADD_LABEL,
  REMOVE_LABEL,
  EDIT_LABEL,
  HANDLE_ARCHIVE,
  RESET_ARCHIVE_NOTE,
  HANDLE_BIN,
  MOVE_TO_ARCHIVE_FROM_BIN,
  DELETE_FOREVER,
} from "./index";
import uuid from "react-uuid";

export const initialState = {
  notesList: [],
  archiveList: [],
  binList: [],
  searchQuery: "",
  labels: [],
  toggle: false,
};

export const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_TOGGLE_SIDEBAR:
      return {
        ...state,
        toggle: payload,
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload,
      };

    case HANDLE_SUBMIT:
      return {
        ...state,
        notesList: [
          {
            id: uuid(),
            title: payload.title,
            content: payload.content,
            label: payload.label,
            backgroundColor: payload.backgroundColor,
          },
          ...state.notesList,
        ],
        labels: [],
      };

    case HANDLE_EDIT:
      return {
        ...state,
        notesList: state.notesList.map((note) =>
          note.id === payload.currId
            ? {
                ...note,
                id: payload.id,
                title: payload.title,
                content: payload.content,
                backgroundColor: payload.backgroundColor,
              }
            : note
        ),
      };

    case ADD_LABEL:
      return {
        ...state,
        labels: [...state.labels, { id: uuid(), labelName: payload }],
      };

    case REMOVE_LABEL:
      return {
        ...state,
        labels: state.labels.filter(({ id }) => id !== payload),
      };

    case EDIT_LABEL:
      return {
        ...state,
        labels: state.labels.map((label) =>
          label.id === payload.id
            ? {
                ...label,
                id: payload.id,
                labelName: payload.labelName,
              }
            : label
        ),
      };

    case HANDLE_ARCHIVE:
      return {
        ...state,
        notesList: state.notesList.filter(({ id }) => id !== payload.currId),
        archiveList: [
          {
            id: payload.id,
            title: payload.title,
            content: payload.content,
            label: payload.label,
            backgroundColor: payload.backgroundColor,
          },
          ...state.archiveList,
        ],
      };

    case RESET_ARCHIVE_NOTE:
      return {
        ...state,
        archiveList: state.archiveList.filter(({ id }) => id !== payload.id),
        notesList: [
          {
            id: payload.id,
            title: payload.title,
            content: payload.content,
            label: payload.label,
            backgroundColor: payload.backgroundColor,
          },
          ...state.notesList,
        ],
      };

    case HANDLE_BIN:
      return {
        ...state,
        notesList: state.notesList.filter(({ id }) => id !== payload.id),
        binList: [
          {
            id: payload.id,
            title: payload.title,
            content: payload.content,
            label: payload.label,
            backgroundColor: payload.backgroundColor,
          },
          ...state.binList,
        ],
      };

    case MOVE_TO_ARCHIVE_FROM_BIN:
      return {
        ...state,
        binList: state.binList.filter(({ id }) => id !== payload.id),
        archiveList: [
          {
            id: payload.id,
            title: payload.title,
            content: payload.content,
            label: payload.label,
            backgroundColor: payload.backgroundColor,
          },
          ...state.archiveList,
        ],
      };

    case DELETE_FOREVER:
      return {
        ...state,
        binList: state.binList.filter(({ id }) => id !== payload),
      };

    default:
      return state;
  }
};
