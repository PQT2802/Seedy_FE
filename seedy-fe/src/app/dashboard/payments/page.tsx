"use client";
import dashboardApiRequest, { Payment } from "@/apiRequests/dashboard";
import { GenericTable } from "@/components/generic/GenericTable";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
  const [sortField, setSortField] = useState<"transactionDate" | "amount">(
    "transactionDate"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    dashboardApiRequest
      .getPayments()
      .then((res) => setPayments(res.extensions.data));
  }, []);

  // **Filter & Sort Logic**
  const filteredPayments = payments
    .filter((payment) =>
      payment.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (payment) => statusFilter === "all" || payment.status === statusFilter
    )
    .filter(
      (payment) =>
        paymentMethodFilter === "all" ||
        payment.paymentMethod === paymentMethodFilter
    )
    .sort((a, b) => {
      if (sortField === "transactionDate") {
        return sortOrder === "asc"
          ? new Date(a.transactionDate).getTime() -
              new Date(b.transactionDate).getTime()
          : new Date(b.transactionDate).getTime() -
              new Date(a.transactionDate).getTime();
      } else if (sortField === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>

      {/* **Search & Filters** */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />

        {/* **Filter by Status** */}
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="Pending">Đang xử lí</SelectItem>
            <SelectItem value="Completed">Hoàn thành</SelectItem>
          </SelectContent>
        </Select>

        {/* **Filter by Payment Method** */}
        <Select onValueChange={setPaymentMethodFilter} defaultValue="all">
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Filter by Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="COD">COD</SelectItem>
            <SelectItem value="OnlineBanking">Online Banking</SelectItem>
          </SelectContent>
        </Select>

        {/* **Sorting** */}
        <Select
          onValueChange={(value) =>
            setSortField(value as "transactionDate" | "amount")
          }
          defaultValue="transactionDate"
        >
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transactionDate">Ngày giao dịch</SelectItem>
            <SelectItem value="amount">Số tiền</SelectItem>
          </SelectContent>
        </Select>

        {/* **Sort Order (Asc/Desc)** */}
        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </Button>
      </div>

      {/* **Payment Table** */}
      <GenericTable data={filteredPayments} />
    </div>
  );
}
