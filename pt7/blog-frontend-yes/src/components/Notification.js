import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (!notification.show) {
    return null;
  } else {
    return <div>notification</div>;
  }
};

export default Notification;
