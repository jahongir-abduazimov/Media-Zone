import { useEffect, useState } from "react";
import request from "../../components/config";
import { useLocation, useNavigate } from "react-router-dom";
import EstimateTable from "./table";
import { Button } from "antd";
import AddEstimate from "./AddModal";

const Estimate = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [estimate, setEstimate] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const state = useLocation();
  const queryParams = new URLSearchParams(state.search);
  const type = queryParams.get("type") || "income";
  const getEstimate = async (e) => {
    if (!e) {
      setLoading(true);
    }
    try {
      const res = await request.get(
        `/estimate/${type === "income" ? "income" : "expence"}/list/`
      );
      setEstimate(res.data.results);
      console.log(res);
    } catch (error) {
      console.error("Error fetching estimate income:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getEstimate();
  }, [type]);
  return (
    <div>
      <AddEstimate
        isOpen={isOpenModal}
        close={() => setIsOpenModal(false)}
        callback={() => getEstimate(true)}
      />
      <p className="text-[#171717] text-[18px] font-medium mb-7">
        Taxminiy hisob
      </p>
      <div className="border-b border-gray-300 flex gap-4 mb-5">
        <button
          onClick={() => navigate("?type=income")}
          className={`border-b-2 text-xl cursor-pointer font-semibold duration-200 ${
            type === "income"
              ? "text-[#8C52FE] border-[#8C52FE]"
              : "text-[#000000a9] border-transparent"
          }`}
        >
          Kirim
        </button>
        <button
          onClick={() => navigate("?type=expense")}
          className={`border-b-2 text-xl cursor-pointer font-semibold duration-200 ${
            type === "expense"
              ? "text-[#8C52FE] border-[#8C52FE]"
              : "text-[#000000a9] border-transparent"
          }`}
        >
          Chiqim
        </button>
      </div>
      <div>
        <div className="flex justify-end mb-3">
          <Button
            type="primary"
            size="large"
            onClick={() => setIsOpenModal(true)}
          >
            Taxminiy hisob qo'shish
          </Button>
        </div>
        <EstimateTable data={estimate} loading={loading} callback={() => getEstimate(true)} />
      </div>
    </div>
  );
};

export default Estimate;
