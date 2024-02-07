import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  protein: number;
  kcal: number;
  carbohydrate: number;
  fat: number;
}

const BarChartComponents: React.FC<BarChartProps> = ({
  protein,
  kcal,
  carbohydrate,
  fat,
}) => {
  const data = [
    { name: "칼로리", dailyCalories: kcal },
    { name: "단백질", dailyCalories: protein },
    { name: "탄수화물", dailyCalories: carbohydrate },
    { name: "지방", dailyCalories: fat },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="dailyCalories" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponents;
