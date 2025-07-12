import TotalSum from "./totalSum";
import { Button, Select } from "antd";
import request from "../../components/config";
import { GoArrowDown } from "react-icons/go";
import { GoArrowUp } from "react-icons/go";
import { useEffect, useState } from "react";
import YearlyBarChart from "./Yearly";
import ClientsTable from "../clients/ClientsTable";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [totalExpense, setTotalExpense] = useState([]);
  const [totalIncome, setTotalIncome] = useState([]);
  const [yearlyIncome, setYearlyIncome] = useState({});
  const [yearlyExpense, setYearlyExpense] = useState({});
  const [yearlyType, setYearlyType] = useState("yearly_income");

  const [type, setType] = useState("income");
  const [incomeExpenseType, setIncomeExpenseType] = useState("current_month");
  const [income, setIncome] = useState(null);
  const [expense, setExpense] = useState(null);

  const [clients, setClients] = useState([]);
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const navigate = useNavigate();

  const getClients = async (e) => {
    if (!e) {
      setEmployeeLoading(true);
    }
    try {
      const res = await request.get(`/client/list/`);
      setClients(res.data.results);
    } catch (e) {
      console.error(e);
    } finally {
      setEmployeeLoading(false);
    }
  };
  useEffect(() => {
    getClients();
  }, []);

  const currentYear = new Date().getFullYear();

  const getExpense = async () => {
    try {
      const res = await request.get(
        `/finance/expence/statistics/?filter=${incomeExpenseType}`
      );
      setExpense(res.data.expence);
    } catch (e) {
      console.error(e);
    }
  };
  const getIncome = async () => {
    try {
      const res = await request.get(
        `/finance/income/statistics/?filter=${incomeExpenseType}`
      );
      console.log(res);
      setIncome(res.data.expence);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getExpense();
    getIncome();
  }, [incomeExpenseType]);

  function getDynamicColor(index) {
    const baseHue = 200;
    const hue = (baseHue + index * 137.508) % 360;
    return `hsl(${hue}, 65%, 60%)`;
  }
  const getTotalExpense = async () => {
    try {
      const res = await request.get("/finance/expence/category/list/");
      setTotalExpense(res.data.results);
    } catch (e) {
      console.error(e);
    }
  };

  const getTotalIncome = async () => {
    try {
      const res = await request.get("/finance/income/category/list/");
      setTotalIncome(res.data.results);
    } catch (e) {
      console.error(e);
    }
  };

  const getYearlyIncome = async () => {
    try {
      const res = await request.get("/finance/income/monthly-statistics/");
      setYearlyIncome(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getYearlyExpense = async () => {
    try {
      const res = await request.get("/finance/expence/monthly-statistics/");
      setYearlyExpense(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTotalExpense();
    getTotalIncome();
    getYearlyIncome();
    getYearlyExpense();
  }, []);
  const totalExpencePrice = totalExpense?.reduce((acc, item) => {
    return acc + (item.total_price || 0);
  }, 0);
  const totalIncomePrice = totalIncome?.reduce((acc, item) => {
    return acc + (item.total_price || 0);
  }, 0);
  return (
    <>
      <div className="flex items-start gap-5">
        <div className="flex flex-col gap-5">
          <div className="w-full border border-[#EBEBEB] rounded-2xl p-4 pb-10">
            <Select
              onChange={(e) => setIncomeExpenseType(e)}
              defaultValue={"current_month"}
              className="w-[140px]"
            >
              <Select.Option value="current_month">Joriy oy</Select.Option>
              <Select.Option value="current_week">Joriy hafta</Select.Option>
              <Select.Option value="current_year">Joriy yil</Select.Option>
            </Select>
            <div className="flex items-end justify-between mt-5">
              <div className="flex items-end gap-1">
                <div className="w-7 h-7 border flex items-center justify-center rounded-full border-[green]">
                  <GoArrowDown size={20} color="green" />
                </div>
                <div className="flex flex-col">
                  <p className="mb-2 text-[#A3A3A3] text-sm font-medium">
                    KIRIM
                  </p>
                  <p className="text-lg font-semibold text-[green]">
                    {income?.toLocaleString() || 0}{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-end gap-1">
                <div className="w-7 h-7 border flex items-center justify-center rounded-full border-[red]">
                  <GoArrowUp size={20} color="red" />
                </div>
                <div className="flex flex-col">
                  <p className="mb-2 text-[#A3A3A3] text-sm font-medium">
                    CHIQIM
                  </p>
                  <p className="text-lg font-semibold text-[red]">
                    {expense?.toLocaleString() || 0}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative min-w-[352px] max-w-[352px] border border-[#EBEBEB] rounded-2xl p-4 pb-10">
            <div className="pb-4 border-b border-[#EBEBEB] relative z-10 flex items-start justify-between">
              <Select
                onChange={(e) => setType(e)}
                defaultValue={"income"}
                className="w-[90px]"
              >
                <Select.Option value="income">Kirim</Select.Option>
                <Select.Option value="expence">Chiqim</Select.Option>
              </Select>
            </div>
            <div className="absolute top-11">
              <TotalSum
                expense={totalExpense}
                income={totalIncome}
                type={type}
              />
            </div>
            <div className="flex flex-col items-center mt-24">
              <span className="text-[#5C5C5C] text-sm">UMUMIY</span>
              {type === "income" ? (
                <p className="text-[18px] font-medium">
                  {totalIncomePrice?.toLocaleString()} UZS
                </p>
              ) : (
                <p className="text-[18px] font-medium">
                  {totalExpencePrice?.toLocaleString()} UZS
                </p>
              )}
            </div>
            {type === "expence" ? (
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                {totalExpense?.map((name, index) => (
                  <div key={name} className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getDynamicColor(index) }}
                    />
                    <p className="text-[#5C5C5C] text-[14px] font-medium">
                      {name.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                {totalIncome?.map((name, index) => (
                  <div key={name} className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getDynamicColor(index) }}
                    />
                    <p className="text-[#5C5C5C] text-[14px] font-medium">
                      {name.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="w-full p-4 border border-[#EBEBEB] rounded-2xl"
          style={{ width: "100%" }}
        >
          <div className="mb-5 flex items-center gap-10">
            <Select
              onChange={(e) => setYearlyType(e)}
              defaultValue={"yearly_income"}
              className="w-[90px]"
            >
              <Select.Option value="yearly_income">Kirim</Select.Option>
              <Select.Option value="yearly_expence">Chiqim</Select.Option>
            </Select>
            <p className="text-[20px] font-semibold">
              Joriy yil {yearlyType === "yearly_income" ? "kirim" : "chiqim"}{" "}
              statistikasi
            </p>
          </div>
          <YearlyBarChart
            income={yearlyIncome}
            expense={yearlyExpense}
            year={currentYear}
            type={yearlyType}
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[24px] font-semibold">Mijozlar</p>
          <Button onClick={() => navigate("/clients")}>Barchasi</Button>
        </div>
        <ClientsTable
          data={clients?.slice(0, 4)}
          loading={employeeLoading}
          isDashboard={true}
          onAddCallback={() => getClients(true)}
        />
      </div>
    </>
  );
};

export default Dashboard;
