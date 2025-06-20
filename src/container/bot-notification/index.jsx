import React, { useEffect } from "react";
import BotTable from "./Table";
import request from "../../components/config/index";
import { Pagination } from "antd";

const BotNotification = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [dataCount, setDataCount] = React.useState(0);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await request.get(
        "/students/notification/list/?page=" + currentPage
      );
      setData(res.data.results);
      setDataCount(res.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <div>
      <div className="flex items-center justify-between pb-4 border-b mb-5 border-[#EBEBEB]">
        <div>
          <p className="text-[#171717] text-[18px] font-medium">
            Bot Bildirishnomalari
          </p>
        </div>
      </div>
      <BotTable data={data} loading={loading} />
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

export default BotNotification;
