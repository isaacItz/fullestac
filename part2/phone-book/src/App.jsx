import { useState } from "react";
import Phonebook from "@src/components/PhoneBook";
import AddContactForm from "@src/components/AddContactForm";
import Filter from "@src/components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filter, setFilter] = useState("");


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <AddContactForm persons={persons} setPersons={setPersons} />
      <Phonebook persons={persons} filter={filter}/>
    </div>
  );
};

export default App;
