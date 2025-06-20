import { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class Example extends PureComponent {
  render() {
    const { expense } = this.props;
    const { income } = this.props;
    const { year } = this.props;

    const monthNames = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ];

    function transformData(incomeObj, expenseObj) {
      return monthNames.map((month, index) => {
        const monthIndex = index + 1;
        return {
          name: month,
          Kirim: incomeObj[monthIndex] || 0,
          Chiqim: expenseObj[monthIndex] || 0,
        };
      });
    }

    const data = transformData(income?.[year] || {}, expense?.[year] || {});
    const formatNumber = (value) => {
      return new Intl.NumberFormat().format(value);
    };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 0, right: 0 }} />
          <YAxis tickFormatter={(value) => formatNumber(value)} />
          <Tooltip
            formatter={(value) => formatNumber(value)}
            labelFormatter={(label) => label}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Kirim"
            stroke="#8884d8"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="Chiqim"
            stroke="red"
            strokeWidth={5}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
