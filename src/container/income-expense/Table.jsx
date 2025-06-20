import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popover, Table } from "antd";
import { useState } from "react";
import request from "../../components/config";
import EditExpense from "./EditExpense";

const ExpenseTable = ({ data, loading, onAddCallback }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [visiblePopoverId, setVisiblePopoverId] = useState(null);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      await request.delete(`/expences/expence/${id}/delete/`);
      onAddCallback?.(); // Malumotlarni yangilash uchun
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteLoading(false);
      setVisiblePopoverId(null); // Popoverni yopish
    }
  };

  const columns = [
    {
      title: <p className="text-[#5C5C5C] font-normal">Sana</p>,
      dataIndex: "date",
      render: (date) => (
        <p className="font-medium text-sm line-clamp-2">{date}</p>
      ),
      width: "100px",
    },
    // {
    //   title: <p className="text-[#5C5C5C] font-normal">Nomi</p>,
    //   dataIndex: "name",
    //   render: (name) => (
    //     <p className="font-medium text-sm line-clamp-2">{name}</p>
    //   ),
    //   width: "100px",
    // },
    {
      title: <p className="text-[#5C5C5C] font-normal">Summa</p>,
      dataIndex: "price",
      render: (price) => (
        <p className="font-medium text-sm line-clamp-2">
          {price?.toLocaleString()} UZS
        </p>
      ),
      width: "100px",
    },
    {
      title: <p className="text-[#5C5C5C] font-normal">Izoh</p>,
      dataIndex: "comment",
      render: (comment) => (
        <p className="font-medium text-sm line-clamp-2">{comment}</p>
      ),
      width: "200px",
    },
    // {
    //   dataIndex: "id",
    //   render: (id, rowData) => {
    //     console.log(rowData);
    //     const content = (
    //       <div className="flex gap-2 justify-center">
    //         <Button onClick={() => setVisiblePopoverId(null)}>Yo'q</Button>
    //         <Button
    //           type="primary"
    //           danger
    //           loading={deleteLoading}
    //           onClick={() => handleDelete(id)}
    //           iconPosition="end"
    //         >
    //           Ha
    //         </Button>
    //       </div>
    //     );

    //     return (
    //       <div className="flex gap-3">
    //         <EditExpense data={rowData} onAddCallback={onAddCallback} />
    //         <Popover
    //           trigger="click"
    //           visible={visiblePopoverId === id}
    //           onVisibleChange={(visible) => {
    //             setVisiblePopoverId(visible ? id : null);
    //           }}
    //           content={content}
    //           title="O'chirmoqchimisiz?"
    //         >
    //           <Button icon={<DeleteOutlined />} />
    //         </Popover>
    //       </div>
    //     );
    //   },
    //   width: "0px",
    // },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default ExpenseTable;
