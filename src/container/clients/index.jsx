import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import ClientsTable from "./ClientsTable";
import request from "../../components/config";
import { useEffect, useState } from "react";
import AddClient from "./AddClient";
import { useLocation, useNavigate } from "react-router-dom";

const Clients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataCount, setDataCount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const state = useLocation();
  const queryParams = new URLSearchParams(state.search);
  const status = queryParams.get("status");

  const getClients = async (e) => {
    if (!e) {
      setLoading(true);
    }
    try {
      const res = await request.get(
        `/client/list/?page=${currentPage}`
      );
      console.log(res);
      setData(res.data.results);
      setDataCount(res.data.count);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getClients();
  }, [currentPage, status]);
  const handleAdd = () => {
    getClients(true);
  };
  return (
    <div>
      <AddClient
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        onAddCallback={handleAdd}
      />
      <div className="flex items-center justify-between pb-4 border-b mb-5 border-[#EBEBEB]">
        <div>
          <p className="text-[#171717] text-[18px] font-medium">
            Mijozlar ro'yxati
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsOpenModal(true)}
            type="primary"
            size="large"
            icon={<PlusOutlined />}
          >
            Mijoz qo'shish
          </Button>
        </div>
      </div>
      {/* <div className="mt-5 flex items-center justify-between pb-4 border-b border-[#EBEBEB]">
        <div className="rounded-[10px] bg-[#F7F7F7] flex items-center gap-2 p-1 w-auto">
          <button
            onClick={() => {
              navigate("");
              setCurrentPage(1);
            }}
            className={`text-[14px] cursor-pointer rounded-[6px] py-[6px] px-10 duration-200 ${
              !status
                ? "bg-white shadow-[0px_6px_10px_0px_rgba(14,18,27,0.06),0px_2px_4px_0px_rgba(14,18,27,0.03)] font-medium"
                : "text-[#A3A3A3]"
            }`}
          >
            Mijozlar
          </button>
          <button
            onClick={() => {
              navigate("?status=left");
              setCurrentPage(1);
            }}
            className={`text-[14px] flex gap-2 cursor-pointer rounded-[6px] py-[6px] px-10 duration-200 ${
              status === "left"
                ? "bg-white shadow-[0px_6px_10px_0px_rgba(14,18,27,0.06),0px_2px_4px_0px_rgba(14,18,27,0.03)] font-medium"
                : "text-[#A3A3A3]"
            }`}
          >
            <span>Bo'shaganlar</span>
          </button>
        </div>
      </div> */}
      <ClientsTable
        data={data}
        loading={loading}
        onAddCallback={handleAdd}
        isDashboard={false}
      />
      <div className="mt-5 flex items-center justify-center">
        <Pagination
          onChange={(e) => setCurrentPage(e)}
          pageSize={10}
          showSizeChanger={false}
          current={currentPage}
          total={dataCount}
        />
      </div>
    </div>
  );
};

export default Clients;
