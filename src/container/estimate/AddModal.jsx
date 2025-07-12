import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useNotification } from "../../components/Notification";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import request from "../../components/config";
const AddEstimate = ({ isOpen, close, callback }) => {
  const [form] = Form.useForm();
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();
  const formReset = () => {
    form.resetFields();
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    const newData = {
      reason: e.reason,
      date: dayjs(e.date).format("YYYY-MM-DD"),
      description: e.description,
    };
    try {
      await request.post(`/estimate/${type}/create/`, newData);
      callback();
      formReset();
      close();
      openNotification("success", "Muvaffaqqiyatli qo'shildi!");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        title="Taxminiy hisob qo'shish"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        onCancel={() => {
          close(), formReset();
        }}
        footer={false}
        centered
        width={350}
      >
        <Form
          autoComplete="off"
          onFinish={handleSubmit}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="type"
            rules={[{ required: true, message: "Turini tanlang!" }]}
          >
            <Select
              size="large"
              placeholder="Turi"
              onChange={(e) => setType(e)}
            >
              <Select.Option value="income">Kirim</Select.Option>
              <Select.Option value="expence">Chiqim</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="reason"
            rules={[{ required: true, message: "Nomini kiriting!" }]}
          >
            <Input size="large" placeholder="Nomi" />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Sanasini kiriting!" }]}
          >
            <DatePicker size="large" className="w-full" placeholder="Sanasi" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Tavsif kiriting!" }]}
          >
            <TextArea size="large" placeholder="Tavsif" />
          </Form.Item>
          <Button
            className="w-full"
            type="primary"
            size="large"
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
export default AddEstimate;
