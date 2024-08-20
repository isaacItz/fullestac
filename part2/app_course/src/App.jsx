import Note from './components/Note';

const App = ({ notes }) => {

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, index) => <Note key={note.id} text={note.content}></Note>)} {/* this is wrong 
         you should use note.id instead of index in key prop to prevent React from re-rendering notes when the order changes*/}

      </ul>
    </div>
  )
}

export default App