import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import request from "../../components/config";
const EditModal = ({ data, callback }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    setLoading(true)
    const newData = {
      reason: e.reason,
      date: dayjs(e.date).format("YYYY-MM-DD"),
      description: e.description
    }
    try {
      await request.patch(`/estimate/${data.id}/update/`, newData)
      callback()
      handleCancel()
    } catch (e) {
      console.error(e);
    } setLoading(false)
  };
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} icon={<EditOutlined />} />
      <Modal
        title="Tahrirlash"
        closable={{ "aria-label": "Custom Close Button" }}
        footer={false}
        width={350}
        centered
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          autoComplete="off"
          onFinish={handleSubmit}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="reason"
            rules={[{ required: true, message: "Nomini kiriting!" }]}
            label="Nomi"
            initialValue={data.reason}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Sanasini kiriting!" }]}
            label="Sanasi"
            initialValue={dayjs(data.date)}
          >
            <DatePicker size="large" className="w-full" placeholder="" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Tavsif kiriting!" }]}
            label="Tavsif"
            initialValue={data.description}
          >
            <TextArea size="large" />
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
export default EditModal;
