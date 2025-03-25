"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dashboardApiRequest, {
  DashboardRevenueDto,
} from "@/apiRequests/dashboard";

const DashboardCharts = () => {
  const [data, setData] = useState<DashboardRevenueDto | null>(null);
  const [days, setDays] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dashboardApiRequest.getRevunes();
      setData(response.extensions.data);
    };
    fetchData();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
      {/* Line Chart - Full Width */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Revenue Over Time</h2>
          <div className="flex gap-2 mb-2">
            <Button
              onClick={() => setDays(15)}
              variant={days === 15 ? "default" : "outline"}
            >
              15 Days
            </Button>
            <Button
              onClick={() => setDays(30)}
              variant={days === 30 ? "default" : "outline"}
            >
              30 Days
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.revenueOverTime.slice(-days)}>
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                }
                stroke="#8884d8"
              />
              <YAxis />
              <Tooltip
                labelFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                }
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart and Bar Chart in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Sales by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.salesByCategory}
                  dataKey="revenue"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {data?.salesByCategory.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Top Selling Cards</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.topSellingCards.slice(0, 5)}>
                <XAxis dataKey="cardName" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCharts;
