import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface ChartDataProps {
  protein: number;
  fat: number;
  carbohydrate: number;
}

const PieChartComponents: React.FunctionComponent<ChartDataProps> = ({
  protein,
  fat,
  carbohydrate,
}) => {
  const data = [
    { name: "탄수화물", value: carbohydrate },
    { name: "단백질", value: protein },
    { name: "지방", value: fat },
  ];

  const COLORS = ["#80bfff", "#80d4ff", "#4d94ff"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="70%"
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponents;
