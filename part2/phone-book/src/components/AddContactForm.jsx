import { useState } from "react"

const AddContactForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState(0);

  const addContact = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }
    if (persons.some((person) => person.number && person.number === number)) {
      alert(`${number} is already in the phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: number }));
    setNewName("");
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNumber(event.target.value);
  };
  return (
    <>
      <h2>Add a new contact</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input type="number" onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

export default AddContactForm