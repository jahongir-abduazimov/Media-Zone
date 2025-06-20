import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import request from "../../components/config";
import { useEffect, useState } from "react";
import { useNotification } from "../../components/Notification";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";

const EditClient = ({ isOpen, handleClose, data, onAddCallback }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();

  useEffect(() => {
    if (data && isOpen) {
      form.setFieldsValue({
        name: data.name,
        phone: data.phone,
        status: data.status,
        description: data.description,
      });
    }
  }, [data, isOpen]);

  const formReset = () => {
    form.resetFields();
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await request.patch(`/client/${data.id}/update/`, values);
      onAddCallback();
      handleClose();
      formReset();
      openNotification("success", "Mijoz tahrirlandi");
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
        title={<p className="mb-5">Mijozni tahrirlash</p>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        footer={false}
        onCancel={() => {
          handleClose();
          formReset();
        }}
        centered
        style={{ maxWidth: 370 }}
        modalRender={(modal) => (
          <div onClick={(e) => e.stopPropagation()}>{modal}</div> // 👈 bu eng kuchli yechim
        )}
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
            initialValue={data?.name}
            label="F.I.O"
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Telefon raqamini kiriting!" }]}
            initialValue={data?.phone}
            label="Telefon raqami"
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="status"
            rules={[{ required: true, message: "Statusni tanlang!" }]}
            initialValue={data?.status}
            label="Status"
          >
            <Select size="large">
              <Option value="new">Yangi</Option>
              <Option value="in_progress">Jarayonda</Option>
              <Option value="cancelled">Bekor qilindi</Option>
              <Option value="done">Tugallandi</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Izoh kiriting!" }]}
            initialValue={data?.description}
            label="Izoh"
          >
            <TextArea size="large" />
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
export default EditClient;
