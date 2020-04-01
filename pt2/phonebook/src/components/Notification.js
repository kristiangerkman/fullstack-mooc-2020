import React from "react";

const Notification = ({ notification, setNotification }) => {
  const style = [
    {
      color: "red",
      border: "3px solid red",
      width: "500px",
      textAlign: "center"
    },
    {
      color: "green",
      border: "3px solid green",
      width: "500px",
      textAlign: "center"
    }
  ];

  setTimeout(() => setNotification({ type: "", show: false, name: "" }), 5000);

  if (notification.type === "delete") {
    return (
      <div style={style[0]}>
        <p>Deleted "{notification.name}" from the phonebook</p>
      </div>
    );
  } else if (notification.type === "add") {
    return (
      <div style={style[1]}>
        <p>Added "{notification.name}" to the phonebook</p>
      </div>
    );
  } else if (notification.type === "already") {
    return (
      <div style={style[0]}>
        <p>"{notification.name}" was already deleted from the phonebook</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
