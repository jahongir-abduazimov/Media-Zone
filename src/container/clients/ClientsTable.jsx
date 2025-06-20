import { Table } from "antd";
import EditClient from "./EditClient";
import { useState } from "react";

const ClientsTable = ({ data, loading, onAddCallback, isDashboard }) => {
  const columns = [
    {
      title: <p className="text-[#5C5C5C] font-normal">Qo'shilgan vaqti</p>,
      dataIndex: "created_at",
      render: (created_at) => (
        <p className="font-medium text-sm line-clamp-2">
          {created_at?.slice(0, 10)}
        </p>
      ),
      width: "60px",
    },
    {
      title: <p className="text-[#5C5C5C] font-normal">F.I.O</p>,
      dataIndex: "name",
      render: (name) => (
        <p className="font-medium text-sm line-clamp-2">{name}</p>
      ),
      width: "150px",
    },
    {
      title: <p className="text-[#5C5C5C] font-normal">Telefon raqami</p>,
      dataIndex: "phone",
      render: (phone_number) => (
        <p className="font-medium text-sm line-clamp-2">{phone_number}</p>
      ),
      width: "100px",
    },
    {
      title: <p className="text-[#5C5C5C] font-normal">Status</p>,
      dataIndex: "status",
      render: (status) => (
        <p className="font-medium text-sm line-clamp-2">
          {status === "new" && "Yangi"}
          {status === "in_progress" && "Jarayonda"}
          {status === "cancelled" && "Bekor qilindi"}
          {status === "done" && "Tugallandi"}
        </p>
      ),
      width: "60px",
    },
    {
      title: <p className="text-[#5C5C5C] font-normal">Izoh</p>,
      dataIndex: "description",
      render: (description) => (
        <p className="font-medium text-sm line-clamp-2">{description}</p>
      ),
      width: "150px",
    },
  ];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});

  return (
    <div>
      <EditClient
        data={selectedClient}
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        onAddCallback={onAddCallback}
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: (e) => {
              const tag = e.target.tagName.toLowerCase();
              const className = e.target.className;
              
              if (
                tag === "button" ||
                tag === "svg" ||
                tag === "path" ||
                className.includes("ant-btn") ||
                className.includes("ant-popover") ||
                className.includes("ant-modal")
              ) {
                return;
              }
              setSelectedClient(record);
              setIsOpenModal(true);
            },
          };
        }}
        rowClassName={"cursor-pointer"}
      />
    </div>
  );
};

export default ClientsTable;
