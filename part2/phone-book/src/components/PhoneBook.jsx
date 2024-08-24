import fuzzyFind from "@src/lib/fuzzy";
import personService from "@src/services/persons";

const Phonebook = ({
  header,
  persons,
  setPersons,
  filter,
  setNotification,
}) => {
  const handleDelete = (person) => {
    const mensaje = `Are you sur you want to delete ${person.name}?`;
    if (window.confirm(mensaje)) {
      personService.remove(person.id).catch((err) => {
        setNotification({
          message: `${person.name} was already been deleted`,
          type: "error",
        });
        setTimeout(() => {setNotification(null)}, 5000)
      });
      const newPersons = persons.filter((p) => p.id !== person.id);
      setPersons(newPersons);
    }
  };
  return (
    <>
      <h2>{header}</h2>
      {console.log(persons)}
      {persons
        .filter((p) =>
          fuzzyFind(p.name.toLocaleLowerCase().concat(p.number), filter)
        )
        .map((person) => (
          <div key={person.id}>
            <p>
              {person.name} {person.number}
              <button
                onClick={() => {
                  handleDelete(person);
                }}
              >
                delete
              </button>
            </p>
          </div>
        ))}
    </>
  );
};

export default Phonebook;
