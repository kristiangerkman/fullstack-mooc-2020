import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (!notification.show) {
    return null;
  } else {
    if (notification.type === "good") {
      return (
        <div className="alert alert-success mt-2 text-center" role="alert">
          {notification.message}
        </div>
      );
    } else if (notification.type === "bad") {
      return (
        <div className="alert alert-danger mt-2 text-center" role="alert">
          {notification.message}
        </div>
      );
    } else {
      return null;
    }
  }
};

export default Notification;
