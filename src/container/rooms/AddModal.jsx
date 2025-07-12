import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import request from "../../components/config";
import { useNotification } from "../../components/Notification";

const AddDate = ({ roomId, callback }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { openNotification } = useNotification();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const [startTime, endTime] = values.time_range;
    const payload = {
      room_id: roomId,
      full_name: values.full_name,
      phone: values.phone_number,
      date: dayjs(values.date).format("YYYY-MM-DD"),
      start_time: dayjs(startTime).format("HH:mm:ss"),
      end_time: dayjs(endTime).format("HH:mm:ss"),
      price: values.price,
      description: values.description,
    };
    setLoading(true);
    try {
      await request.post("/rooms/room_order/create/", payload);
      callback()
      setIsModalOpen(false);
      form.resetFields();
      openNotification("success", "Band qilindi")
    } catch (e) {
      console.error(e);
      openNotification("error", "Xatolik yuz berdi!")
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Button type="primary" size="large" onClick={showModal}>
        Band qilish
      </Button>
      <Modal
        title="Band qilish"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
        width={400}
      >
        <Form
          autoComplete="off"
          onFinish={handleSubmit}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="full_name"
            rules={[{ required: true, message: "Ismini kiriting!" }]}
          >
            <Input size="large" placeholder="Ismi" />
          </Form.Item>

          <Form.Item
            name="phone_number"
            rules={[{ required: true, message: "Telefon raqamini kiriting!" }]}
          >
            <Input type="tel" size="large" placeholder="Telefon raqami" />
          </Form.Item>

          <Form.Item
            name="date"
            rules={[{ required: true, message: "Sanasini tanlang!" }]}
          >
            <DatePicker size="large" className="w-full" placeholder="Sanasi" />
          </Form.Item>

          <Form.Item
            name="time_range"
            rules={[
              {
                required: true,
                message: "Boshlanish va tugash vaqtini tanlang!",
              },
            ]}
          >
            <TimePicker.RangePicker
              size="large"
              className="w-full"
              format="HH:mm"
              placeholder={["Boshlanish", "Tugash"]}
              showSecond={false}
            />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[{ required: true, message: "Narxni kiriting!" }]}
          >
            <Input
              type="number"
              size="large"
              className="w-full"
              placeholder="Narxi"
            />
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

export default AddDate;
