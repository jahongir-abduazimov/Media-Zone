import { PureComponent } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function getDynamicColor(index) {
  const baseHue = 200;
  const hue = (baseHue + index * 137.508) % 360;
  return `hsl(${hue}, 65%, 60%)`;
}

function getIncomeColor() {
  return `#8C52FE`;
}

// Formatlash funksiyasi
function formatNumber(value) {
  return value?.toLocaleString("ru-RU");
}

export default class TotalSum extends PureComponent {
  render() {
    const { expense, income, type } = this.props;

    const DataExpence = expense?.map((value) => ({
      name: value?.name,
      value: value?.total_price,
    }));

    const DataIncome = income?.map((value) => ({
      name: value?.name,
      value: value?.total_price,
    }));

    return (
      <PieChart width={400} height={190}>
        <Pie
          data={type === "income" ? DataIncome : DataExpence}
          cx={90}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
          className="outline-none scale-130"
        >
          {(type === "income" ? DataIncome : DataExpence)?.map(
            (entry, index) => (
              <Cell key={`cell-${index}`} fill={getDynamicColor(index)} />
            )
          )}
        </Pie>
        <Tooltip formatter={(value) => formatNumber(value)} />
      </PieChart>
    );
  }
}
