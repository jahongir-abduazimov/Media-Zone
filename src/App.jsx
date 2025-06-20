import { ConfigProvider } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "./components/Notification";

function App() {
  return (
    <NotificationProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#8C52FE",
            fontFamily: "Inter, sans-serif",
          },
        }}
      >
        <Outlet />
      </ConfigProvider>
    </NotificationProvider>
  );
}

export default App;
