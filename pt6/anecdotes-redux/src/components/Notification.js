import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: "10px",
  };

  return notification.show ? (
    <div style={style}>{notification.message}</div>
  ) : null;
};

export default Notification;
