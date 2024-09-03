import { useState } from "react";
import personService from "@src/services/persons";

const AddContactForm = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState(0);

  const addContact = (event) => {
    event.preventDefault();
    const coincidences = persons.filter((person) => person.name === newName || person.number === number);
    console.log("existe agregar", coincidences.length);
    let person = coincidences.find((person) => person.name === newName);
    if (person?.name === newName) {
      const message = `${newName} is already in the phonebook, do you want to update it?`;
      if (window.confirm(message)) {
        const updatedNumber = { number: number };
        personService.partialUpdate(person.id, updatedNumber).then((person) => {
          console.log("partially updated person: ", person);
          setPersons(persons.map((p) => (p.id !== person.id ? p : person)));
        }).catch(err => {
          console.log(`error at updating the existing contact ${err}`)
        });
      }
      return;
    }
    person = coincidences.find(person => person.number === number)
    if (person?.number === number) {
      alert(`${number} is already in the phonebook`);
      return;
    }

    const newPerson = { name: newName, number: number };
    personService.create(newPerson).then((person) => {
      console.log("person added to the api: ", person);
      setNotification({ type: "success", message: `${person.name} was added to the phonebook` })
      setTimeout(() => {
        setNotification(null)
      }, 5000);
      setPersons(persons.concat(person));
      setNewName("");
      setNumber("");
    });
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
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input type="number" value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default AddContactForm;
