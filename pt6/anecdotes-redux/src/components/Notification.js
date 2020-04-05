import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (notification.show) {
    setTimeout(() => dispatch(hideNotification()), 5000);
  }
  return notification.show ? (
    <div style={style}>{notification.message}</div>
  ) : null;
};

export default Notification;
