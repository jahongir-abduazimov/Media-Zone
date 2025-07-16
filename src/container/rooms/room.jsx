import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DateList from "./calendar";
import request from "../../components/config";
import AddDate from "./AddModal";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getRooms = async () => {
    try {
      let res = await request.get("/rooms/room-list/");
      setRooms(res.data.results);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      let res = await request.get(
        `/rooms/${id}/room_order/list/?page_size=100000000000000`
      );
      setData(res.data.results);
      console.log(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [id]);
  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div className="flex gap-3">
          {rooms.map((item) => (
            <Link
              to={`/rooms/${item.id}`}
              className={`${
                id === item.id ? "bg-[#8b52fe20] rounded-t-lg border-[#8C52FE]" : "border-transparent rounded-lg hover:bg-gray-100"
              } py-1 px-3 duration-200 border-b-2`}
            >
              {item.name_uz}
            </Link>
          ))}
        </div>
        <AddDate roomId={id} callback={getData} />
      </div>
      <DateList data={data} isLoading={loading} />
    </div>
  );
};

export default Room;
