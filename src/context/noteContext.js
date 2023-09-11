import { createContext, useContext, useReducer } from "react";
import { initialState, notesReducer } from "../reducer";

const notesContext = createContext(null);

const NotesContextProvider = ({ children }) => {
  const [
    { notesList, searchQuery, labels, toggle, archiveList, binList },
    notesDispatch,
  ] = useReducer(notesReducer, initialState);

  return (
    <notesContext.Provider
      value={{
        notesList,
        searchQuery,
        labels,
        toggle,
        archiveList,
        binList,
        notesDispatch,
      }}
    >
      {children}
    </notesContext.Provider>
  );
};

const useNotes = () => useContext(notesContext);

export { useNotes, NotesContextProvider };
