import { Table } from "antd";

const BotTable = ({ data, loading }) => {
  const columns = [
    {
      title: "T/R",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      width: "50px",
    },
    {
      title: "Xabar",
      dataIndex: "description",
      render: (name) => (
        <p className="font-medium text-sm line-clamp-2">{name}</p>
      ),
    },
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

export default BotTable;
