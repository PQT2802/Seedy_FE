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

  // Calculate total revenue for each chart
  const filteredData = data?.revenueOverTime.slice(-days) || [];

  // 🔹 All-time totals
  const totalRevenueAllTime =
    data?.revenueOverTime.reduce((sum, item) => sum + item.revenue, 0) || 0;
  const totalPaymentsAllTime =
    data?.revenueOverTime.reduce((sum, item) => sum + item.totalPayment, 0) ||
    0;

  // 🔹 Totals for selected days
  const totalRevenueFiltered = filteredData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  const totalPaymentsFiltered = filteredData.reduce(
    (sum, item) => sum + item.totalPayment,
    0
  );

  const totalSalesByCategory = data?.salesByCategory.reduce(
    (sum, item) => sum + item.revenue,
    0
  );
  const totalTopSellingCards = data?.topSellingCards
    .slice(0, 5)
    .reduce((sum, item) => sum + item.revenue, 0);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000"];

  // Format number as currency (VND)
  const formatCurrency = (value: number | undefined) =>
    value !== undefined
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value)
      : "N/A";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
      {/* Line Chart - Revenue Over Time */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold">Tổng doanh thu</h2>
              <p className="text-md">
                Tổng cộng:{" "}
                <span className="font-bold">
                  {formatCurrency(totalRevenueAllTime)}
                </span>
              </p>
              <p className="text-md">
                Trong vòng {days} ngày:{" "}
                <span className="font-bold">
                  {formatCurrency(totalRevenueFiltered)}
                </span>
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Tổng thanh toán</h2>
              <p className="text-md">
                Tổng cộng:{" "}
                <span className="font-bold">{totalPaymentsAllTime}</span>
              </p>
              <p className="text-md">
                Trong vòng {days} ngày:{" "}
                <span className="font-bold">{totalPaymentsFiltered}</span>
              </p>
            </div>
          </div>
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
            <LineChart data={filteredData}>
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
                formatter={(value, name) => {
                  if (name === "Revenue") {
                    return new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(value as number);
                  }
                  return value; // No currency format for totalPayment
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="totalPayment"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Total Payment"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart and Bar Chart in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart - Sales by Category */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Doanh số theo doanh mục</h2>
              <p className="text-xl font-bold">
                Total: {formatCurrency(totalSalesByCategory)}
              </p>
            </div>
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
                <Tooltip
                  formatter={(value) =>
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(value as number)
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - Top Selling Cards */}
        <Card>
          <CardContent>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Thiệp bán chạy nhất</h2>
              <p className="text-xl font-bold">
                Total: {formatCurrency(totalTopSellingCards)}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.topSellingCards.slice(0, 5)}>
                <XAxis dataKey="cardName" stroke="#8884d8" />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(value as number)
                  }
                />
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
