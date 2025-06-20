import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = ["#8C52FE", "red"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function FinancialChart({ income, expense, year, type }) {
  // Process the data from props
  const processData = () => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const incomeData = income[year] || {};
    const expenseData = expense[year] || {};
    
    return months.map((month, index) => {
      const monthNumber = index + 1;
      return {
        name: month,
        income: incomeData[monthNumber] || 0,
        expense: expenseData[monthNumber] || 0,
      };
    });
  };

  const data = processData();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ left: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => new Intl.NumberFormat('ru').format(value)} />
        <Tooltip formatter={(value) => new Intl.NumberFormat('ru').format(value)} />
        <Legend />
        <Bar
          dataKey={type === "yearly_income" ? "income" : "expense"}
          name={type === "yearly_income" ? "Kirim" : "Chiqim"}
          fill="#8884d8"
        //   label={{ position: "top", formatter: (value) => value > 0 ? new Intl.NumberFormat('en').format(value) : '' }}
        >
          {data.map((entry, index) => (
            <Cell key={`income-cell-${index}`} fill={type === "yearly_income" ? colors[0] : colors[1]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

FinancialChart.defaultProps = {
  income: {},
  expense: {},
};