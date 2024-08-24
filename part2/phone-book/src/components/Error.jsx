const Error = ({ message }) => {
  if (!message) return null;

  const style = {
    color: "red",
    fontSize: "1.5em",
    fontWeight: "bold",
  };
  return <p style={style}>Error: {message}</p>;
};

export default Error