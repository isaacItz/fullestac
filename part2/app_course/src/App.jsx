import Note from "./components/Note";
import { useState, useEffect } from "react";
import Notification from "@src/components/Notification";
import noteService from "@src/services/notes";
import Footer from "@src/components/Footer";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((data) => {
      setNotes(data);
      console.log("effect completed");
    });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      // id: notes.length + 1, our api backend will handle this
      important: Math.random() > 0.5,
    };
    noteService.create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote));
    });
    setNewNote("");
  };
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  console.log("filter: ", notesToShow);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map((note, index) => {
          return (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            ></Note>
          );
        })}
        {/* you should use note.id instead of index in key prop to prevent React from re-rendering notes when the order changes*/}
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">save</button>
        </form>
        solo notas importantes:
        <button type="button" onClick={() => setShowAll(!showAll)}>
          {!showAll ? "si" : "no"}
        </button>
      </ul>
    <Footer />
    </div>
  );
};

export default App;
