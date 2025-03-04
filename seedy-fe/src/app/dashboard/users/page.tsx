"use client";

import dashboardApiRequest from "@/apiRequests/dashboard";
import { GenericTable } from "@/components/generic/GenericTable";
import { useEffect, useState } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    dashboardApiRequest.getUsers().then((res) => setUsers(res.extensions.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <GenericTable data={users} />
    </div>
  );
}
