import "../App.css";
import React from "react";
import { NotesForm, NotesList } from "../components";

export const Home = () => {
  return (
    <div className="notes-container">
      <NotesForm />
      <NotesList />
    </div>
  );
};
