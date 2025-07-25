import React, { useState } from "react";
import { Badge, Calendar, Modal, Table, Spin } from "antd";
import dayjs from "dayjs";

const columns = [
  {
    title: "Ism",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Telefon",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Boshlanish",
    dataIndex: "start_time",
    key: "start_time",
    render: (text) => text.slice(0, 5),
  },
  {
    title: "Tugash",
    dataIndex: "end_time",
    key: "end_time",
    render: (text) => text.slice(0, 5),
  },
  {
    title: "Narx",
    dataIndex: "price",
    key: "price",
    render: (value) => `${value.toLocaleString()} so'm`,
  },
  {
    title: "Izoh",
    dataIndex: "description",
    key: "description",
  },
];

const DateList = ({ data, isLoading }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getListData = (value) => {
    return data
      .filter((item) => dayjs(item.date).isSame(value, "day"))
      .map((item) => ({
        type: "success",
        content: `${item.start_time.slice(0, 5)} - ${item.end_time.slice(
          0,
          5
        )}`,
      }));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events flex flex-col items-center gap-2">
        {listData.map((item, index) => (
          <li key={index} className="bg-[#8C52FE] rounded px-2">
            <p className="text-white">{item.content}</p>
          </li>
        ))}
      </ul>
    );
  };

  const onSelectDate = (value) => {
    const events = data.filter((item) => dayjs(item.date).isSame(value, "day"));
    if (events.length > 0) {
      setSelectedDate(events);
      setModalVisible(true);
    }
  };

  return (
    <Spin spinning={isLoading} size="large">
      <Calendar dateCellRender={dateCellRender} onSelect={onSelectDate} />

      <Modal
        open={modalVisible}
        title="Sana tafsilotlari"
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
        centered
      >
        <Table
          dataSource={selectedDate || []}
          columns={columns}
          rowKey="id"
          pagination={false}
          loading={isLoading}
        />
      </Modal>
    </Spin>
  );
};

export default DateList;
