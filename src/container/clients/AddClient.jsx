import { Button, Form, Input, Modal } from "antd";
import request from "../../components/config";
import { useState } from "react";
import { useNotification } from "../../components/Notification";
import TextArea from "antd/es/input/TextArea";
const AddClient = ({ isOpen, handleClose, onAddCallback }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();
  const formReset = () => {
    form.resetFields();
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await request.post("/client/create/", values);
      onAddCallback();
      handleClose();
      formReset();
      openNotification("success", "Mijoz qo'shildi");
    } catch (e) {
      console.error(e);
      openNotification("error", "Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title={<p className="mb-5">Mijoz qo'shish</p>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        footer={false}
        onCancel={() => {
          handleClose();
          formReset();
        }}
        centered
        style={{ maxWidth: 370 }}
      >
        <Form
          autoComplete="off"
          onFinish={handleSubmit}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Ismini kiriting!" }]}
          >
            <Input size="large" placeholder="F.I.O" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Telefon raqamini kiriting!" },
            ]}
          >
            <Input size="large" placeholder="Telefon raqami" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Izoh kiriting!" },
            ]}
          >
            <TextArea size="large" placeholder="Izoh" />
          </Form.Item>
          <Button
            size="large"
            className="w-full"
            type="primary"
            htmlType="submit"
            loading={loading}
            iconPosition="end"
          >
            Saqlash
          </Button>
        </Form>
      </Modal>
    </>
  );
};
export default AddClient;
