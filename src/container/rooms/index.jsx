import { useEffect, useState } from "react";
import request from "../../components/config";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const getRooms = async () => {
    setLoading(true);
    try {
      let res = await request.get("/rooms/room-list/");
      setRooms(res.data.results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);
  return (
    <div>
      <p className="text-[#171717] text-[18px] font-medium mb-7">Xonalar</p>
      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          <Spin size="large" />
        </div>
      ) : rooms.length > 0 ? (
        <div className="flex flex-wrap gap-5">
          {rooms.map((item) => (
            <Link
              to={`/rooms/${item.id}?name=${item.name}`}
              className="w-[200px] h-[200px] border border-gray-400 text-gray-600 rounded-2xl text-2xl cursor-pointer flex items-center justify-center p-4"
            >
              {item.name}
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-xl">Xona mavjud emas</p>
        </div>
      )}
    </div>
  );
};

export default Rooms;
