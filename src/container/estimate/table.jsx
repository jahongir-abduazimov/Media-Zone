import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import EditModal from "./EditModal";
import AddEstimate from "./AddModal";
import { useState } from "react";
import request from "../../components/config";

const EstimateTable = ({ data, loading, callback }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState("");
  const handleDelete = async (id) => {
    setDeleteLoading(id);
    try {
      await request.delete(`/estimate/${id}/delete/`);
      callback()
    } catch (e) {
      console.error(e);
    }
  };
  const columns = [
    {
      title: <p className="text-[#5C5C5C] font-normal">Sanasi</p>,
      dataIndex: "date",
      render: (date) => (
        <p className="font-medium text-sm line-clamp-2">{date?.slice(0, 10)}</p>
      ),
      width: "60px",
    },
    {
      title: <p className="text-[#5C5C5C] font-normal">Nomi</p>,
      dataIndex: "reason",
      render: (reason) => (
        <p className="font-medium text-sm line-clamp-2">{reason}</p>
      ),
      width: "100px",
    },
    {
      title: <p className="text-[#5C5C5C] font-normal">Tafsilot</p>,
      dataIndex: "description",
      render: (description) => (
        <p className="font-medium text-sm line-clamp-2">{description}</p>
      ),
      width: "150px",
    },
    {
      dataIndex: "id",
      render: (id, data) => (
        <div className="flex gap-4">
          <EditModal data={data} callback={callback} />
          <Button
            onClick={() => handleDelete(id)}
            danger
            icon={<DeleteOutlined />}
            loading={deleteLoading == id ? true : false}
          />
        </div>
      ),
      width: "20px",
    },
  ];

  return (
    <div>
      <AddEstimate isOpen={isOpenModal} close={() => setIsOpenModal(false)} />
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

export default EstimateTable;
