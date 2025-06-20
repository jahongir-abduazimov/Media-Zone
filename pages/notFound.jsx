import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Bu sahifa mavjud emas"
      extra={
        <Link to={"/"}>
          <Button size="large" type="primary">
            Bosh sahifa
          </Button>
        </Link>
      }
    />
  );
};
export default NotFound;
