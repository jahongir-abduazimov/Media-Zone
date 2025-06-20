import Yearly from "./Yearly";
import request from "../../components/config";
import { useEffect, useState } from "react";
import { Button, Pagination, Select } from "antd";
import ExpenseTable from "./Table";
import AddExpense from "./AddExpense";
import { useLocation, useNavigate } from "react-router-dom";

const IncomeExpence = () => {
  const state = useLocation();
  const queryParams = new URLSearchParams(state.search);
  const type = queryParams.get("type") || "income";
  const [yearlyIncome, setYearlyIncome] = useState({});
  const [yearlyExpence, setYearlyExpence] = useState({});
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenceCategories, setExpenceCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState();
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseLoading, setExpenseLoading] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCount, setDataCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setActiveCategory(
      type === "income" ? incomeCategories[0]?.id : expenceCategories[0]?.id
    );
  }, [incomeCategories, expenceCategories, type]);

  const years = Array.from(
    new Set([
      ...Object.keys(yearlyIncome || {}),
      ...Object.keys(yearlyExpence || {}),
    ])
  ).map(Number);
  const getYearlyIncome = async () => {
    try {
      const res = await request.get("/finance/income/monthly-statistics/");
      setYearlyIncome(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getYearlyExpence = async () => {
    try {
      const res = await request.get("/finance/expence/monthly-statistics/");
      setYearlyExpence(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getIncomCategories = async () => {
    try {
      const res = await request.get(`/finance/income/category/list/`);
      console.log(res);
      setIncomeCategories(res.data.results);
    } catch (e) {
      console.error(e);
    }
  };
  const getExpenceCategories = async () => {
    try {
      const res = await request.get(`/finance/expence/category/list/`);
      console.log(res);
      setExpenceCategories(res.data.results);
    } catch (e) {
      console.error(e);
    }
  };

  const getExpenceCategory = async (e) => {
    if (!e) {
      setExpenseLoading(true);
    }
    try {
      const res = await request.get(
        `/finance/expence/category/${activeCategory}/expence/list/?page=${currentPage}&page_size=10`
      );
      console.log(res);
      setDataCount(res.data.count);
      setExpenseData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setExpenseLoading(false);
    }
  };
  const getIncomeCategory = async (e) => {
    if (!e) {
      setExpenseLoading(true);
    }
    try {
      const res = await request.get(
        `/finance/income/category/${activeCategory}/income/list/?page=${currentPage}&page_size=10`
      );
      console.log(res);
      setDataCount(res.data.count);
      setIncomeData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setExpenseLoading(false);
    }
  };

  useEffect(() => {
    if (type === "income") {
      getIncomeCategory();
    } else {
      getExpenceCategory();
    }
  }, [activeCategory, currentPage]);

  useEffect(() => {
    getYearlyIncome();
    getYearlyExpence();
    getIncomCategories();
    getExpenceCategories();
  }, []);
  return (
    <div>
      <AddExpense
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        type={type}
        onAddCallback={() => {
          if (type === "income") {
            getIncomeCategory(true);
          } else {
            getExpenceCategory(true);
          }
          getYearlyExpence();
          getYearlyIncome();
        }}
        categories={type === "income" ? incomeCategories : expenceCategories}
      />
      <div
        className="border border-[#EBEBEB] rounded-xl pt-[10px] pb-[70px] pr-8"
        style={{ width: "100%", height: 500 }}
      >
        <div className="pl-4 pb-6 flex items-center justify-between">
          <p className="text-[24px] font-semibold">Yillik kirim chiqim</p>
          <Select
            size="large"
            defaultValue={currentYear}
            onChange={(e) => setYear(e)}
          >
            {years?.map((year) => (
              <Select.Option value={year}>{year}</Select.Option>
            ))}
          </Select>
        </div>
        <Yearly income={yearlyIncome} expense={yearlyExpence} year={year} />
      </div>
      <div className="mt-10">
        <p className="text-2xl font-semibold mb-4">Kirim chiqim ma'lumotlari</p>
        <div className="flex items-center justify-between mb-5">
          <div className="border-2 rounded-lg flex border-[#8C52FE]">
            <button
              onClick={() => navigate("/income-expense?type=income")}
              className={`py-3 px-4 cursor-pointer border-r-2 border-[#8C52FE] text-[#8C52FE] font-medium duration-200 ${
                type === "income" && "bg-[#8b52fe2b]"
              }`}
            >
              Kirim
            </button>
            <button
              onClick={() => navigate("/income-expense?type=expence")}
              className={`py-3 px-4 cursor-pointer text-[#8C52FE] font-medium duration-200 ${
                type === "expence" && "bg-[#8b52fe2b]"
              }`}
            >
              Chiqim
            </button>
          </div>
          <Button
            onClick={() => setIsOpenModal(true)}
            size="large"
            type="primary"
          >
            {type === "income" ? "Kirim qo'shish" : "Chiqim qo'shish"}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            {type === "income"
              ? incomeCategories?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCategory(item.id);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 hover:bg-gray-200 duration-200 border-b-2 cursor-pointer rounded-t-md ${
                      activeCategory == item.id
                        ? "border-[#8884d8]"
                        : "border-transparent"
                    }`}
                  >
                    {item.name}
                  </button>
                ))
              : expenceCategories?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveCategory(item.id);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 hover:bg-gray-200 duration-200 border-b-2 cursor-pointer rounded-t-md ${
                      activeCategory == item.id
                        ? "border-[#8884d8]"
                        : "border-transparent"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
          </div>
        </div>
        <div>
          <ExpenseTable
            data={type === "income" ? incomeData : expenseData}
            loading={expenseLoading}
            onAddCallback={() => {
              getCategory(true);
              getYearlyExpence();
              getYearlyIncome();
            }}
          />
        </div>
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
    </div>
  );
};

export default IncomeExpence;
