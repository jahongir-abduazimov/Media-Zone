import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import request from "../../components/config";
import { useState } from "react";
import { useNotification } from "../../components/Notification";
import TextArea from "antd/es/input/TextArea";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const EditExpense = ({ data, onAddCallback }) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();
  const formReset = () => {
    form.resetFields();
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    const newData = {
      name: values.name,
      description: values.description,
      price: values.price,
      date:
        String(values.date.$y) +
        "-" +
        String(
          values.date.$M + 1 < 10
            ? "0" + String(values.date.$M + 1)
            : values.date.$M + 1
        ) +
        "-" +
        String(values.date.$D),
    };
    try {
      await request.patch(`/expences/expence/${data.id}/update/`, newData);
      onAddCallback(true);
      setIsOpen(false);
      formReset();
      openNotification("success", "Muvaffaqqiyatli tahrirlandi");
    } catch (e) {
      console.error(e);
      openNotification("error", "Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
          form.setFieldsValue({
            name: data.name,
            price: data.price,
            date: data.date ? dayjs(data.date) : null,
            description: data.description,
          });
        }}
        icon={<EditOutlined />}
      />
      <Modal
        title={<p className="mb-5">Chiqimni tahrirlash</p>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        footer={false}
        onCancel={() => {
          setIsOpen(false);
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
            label="Nomi"
            name="name"
            rules={[{ required: true, message: "Nomini kiriting!" }]}
            initialValue={data.name}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Summa"
            name="price"
            rules={[{ required: true, message: "Summa kiriting!" }]}
            initialValue={data.price}
          >
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item
            label="Sanasi"
            name="date"
            rules={[{ required: true, message: "Sanasini kiriting!" }]}
            initialValue={data.date ? dayjs(data.date) : null}
          >
            <DatePicker size="large" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Izoh"
            name="description"
            rules={[{ required: true, message: "Izoh kiriting!" }]}
            initialValue={data.description}
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
export default EditExpense;
