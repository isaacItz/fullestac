const Filter = ({ setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      filter shown by:
      <input onChange={handleFilterChange} />
    </>
  );
};

export default Filter;
