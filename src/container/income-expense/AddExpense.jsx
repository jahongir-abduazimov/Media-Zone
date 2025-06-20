import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import request from "../../components/config";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNotification } from "../../components/Notification";
import TextArea from "antd/es/input/TextArea";

const AddExpense = ({
  isOpen,
  handleClose,
  onAddCallback,
  categories,
  type,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { openNotification } = useNotification();
  const formReset = () => {
    form.resetFields();
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    const newData = {
      category_id: values.category_id,
      price: values.price,
      date: dayjs(values.date).format("YYYY-MM-DD"),
      comment: values.comment,
    };
    try {
      if (type === "income") {
        await request.post("/finance/income/create/", newData);
      }  else {
        await request.post("/finance/expence/create/", newData);
      }
      onAddCallback();
      handleClose();
      formReset();
      openNotification("success", "Muvaffaqqiyatli qo'shildi");
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
        title={
          <p className="mb-5">
            {type === "income" ? "Kirim qo'shish" : "Chiqim qo'shish"}
          </p>
        }
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
            name="category_id"
            rules={[{ required: true, message: "Turini tanlang tanlang!" }]}
          >
            <Select size="large" placeholder="Turi">
              {categories?.map(
                (item, index) =>
                  item.name !== "oylik maosh" && (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  )
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Summa kiriting!" }]}
          >
            <Input type="number" size="large" placeholder="Summa" />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[{ required: true, message: "Sanasini kiriting!" }]}
          >
            <DatePicker size="large" className="w-full" placeholder="Sanasi" />
          </Form.Item>
          <Form.Item
            name="comment"
            rules={[{ required: true, message: "Izoh kiriting!" }]}
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
export default AddExpense;
