const Notification = ({ notification }) => {
  console.log("notification ", notification);
  if (!notification) return null;

  const { type, message } = notification;
  const styles = {
    success: { color: "green" },
    error: { color: "red" },
    update: { color: "orange" },
  };
  const style = styles[type] || {};

  return (
    <p style={{border: "1px solid", fontSize: "1.5em", fontWeight: "bold", ...style }}>{message}</p>
  );
};

export default Notification;
