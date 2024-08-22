import Note from "./components/Note";
import { useState } from "react";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("new note...");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      id: notes.length + 1,
      important: Math.random() > 0.5,
    };
    console.log(`is note important: ${noteObject.important}`);
    setNotes(notes.concat(noteObject));
    setNewNote("new note...");
  };
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important);
  console.log('filter: ',notesToShow);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note, index) => {
          return <Note key={note.id} text={note.content}></Note>;
        })}
        {/* you should use note.id instead of index in key prop to prevent React from re-rendering notes when the order changes*/}
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">save</button>
        </form>
        solo notas importantes:
        <button type="button" onClick={() => setShowAll(!showAll)}>{!showAll ? 'si' : 'no'}</button>
      </ul>
    </div>
  );
};

export default App;
