import fuzzyFind from "@src/lib/fuzzy";
const Phonebook = ({header, persons, filter }) => {
  return (
    <>
      <h2>{header}</h2>
      {persons
        .filter((p) =>
          fuzzyFind(p.name.toLocaleLowerCase().concat(p.number), filter)
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </>
  );
};

export default Phonebook;
