import React, { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { notification, message } from "antd";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const openNotification = (type, msg) => {
    if (isSmallScreen) {
      message[type](msg);
    } else {
      api[type]({
        message: <p className="font-[Inter]">{msg}</p>,
        placement: "topRight",
        duration: 4,
      });
    }
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
