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

  setTimeout(
    () => setNotification({ type: "", show: false, message: "" }),
    5000
  );

  if (notification.type === "bad") {
    return (
      <div style={style[0]}>
        <p>{notification.message}</p>
      </div>
    );
  } else if (notification.type === "good") {
    return (
      <div style={style[1]}>
        <p>{notification.message}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
