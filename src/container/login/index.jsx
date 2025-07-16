import { useState } from "react";
import Logo from "../../assets/img/logo.png";
import { Button, Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MdOutlinePassword } from "react-icons/md";
import request from "../../components/config";
import { useNotification } from "../../components/Notification";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await request.post("/auth/login/", values);
      localStorage.setItem("auth", res.data.access);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      openNotification("error", "Login yoki parol noto'g'ri!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-[50%] h-full flex items-center justify-center bg-[#8b52fe41]">
        <img src={Logo} alt="logo" width={350} />
      </div>
      <div className="w-[50%] h-full flex items-center justify-center flex-col gap-5">
        <p className="text-[30px] font-bold">Kirish</p>
        <div>
          <Form
            style={{ width: 300 }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Raqam kiriting!" }]}
            >
              <Input
                size="large"
                placeholder="Login"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Parol kiriting!" }]}
            >
              <Input.Password
                size="large"
                placeholder="Parol"
                prefix={<MdOutlinePassword />}
              />
            </Form.Item>
            <Button
              className="w-full"
              size="large"
              type="primary"
              loading={loading}
              iconPosition="end"
              htmlType="submit"
            >
              Kirish
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
