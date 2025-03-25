import DashboardCharts from "@/components/dashboard/DashboardCharts";

import StatisticsCards from "@/components/dashboard/statistics-cards";

// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <StatisticsCards />
      <div className="p-4 rounded-l">
        <DashboardCharts />
      </div>
    </div>
  );
}
