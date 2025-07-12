import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DateList from "./calendar";
import request from "../../components/config";
import { Button } from "antd";
import AddDate from "./AddModal";

const Room = () => {
  const state = useLocation();
  const queryParams = new URLSearchParams(state.search);
  const name = queryParams.get("name");
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      let res = await request.get(`/rooms/${id}/room_order/list/?page_size=100000000000000`);
      setData(res.data.results);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <p className="text-[#171717] text-[18px] font-medium">{name}</p>
        <AddDate roomId={id} callback={getData} />
      </div>
      <DateList data={data} />
    </div>
  );
};

export default Room;
