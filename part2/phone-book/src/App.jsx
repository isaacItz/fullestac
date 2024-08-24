import { useState, useEffect } from "react";
import Phonebook from "@src/components/PhoneBook";
import AddContactForm from "@src/components/AddContactForm";
import Filter from "@src/components/Filter";
import Notification from "@src/components/Notification";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((err) => {
        console.erros(`Error getting persons ${err.message}}, err`);
      });
  };
  useEffect(hook, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter setFilter={setFilter} />
      <AddContactForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <Phonebook persons={persons} setPersons={setPersons} filter={filter} setNotification={setNotification} />
    </div>
  );
};

export default App;
