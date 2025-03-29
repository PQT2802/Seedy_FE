"use client";

import * as React from "react";
import {
  PackageSearch,
  Truck,
  ChartArea,
  Users,
  CreditCard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/ui/team-switcher";
import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import Image from "next/image";
import http from "@/lib/https";
import envConfig from "@/config";
import { useRouter } from "next/navigation";
// Ensure you have an HTTP request utility
// Adjust path based on your project structure

// UserData Interface
interface UserData {
  userId: string;
  userName: string;
  email: string;
  roleName: string;
  phoneNumber: string;
  address: string;
  avatar: string;
}

// API Request
const userApiRequest = {
  getUserInfo: () => http.get<UserData>("api/User/user-infor"),
};

// Logo Component
const SeedyLogoComponent = () => (
  <Image
    src="/logo-seedy-mo-i-tra-ng-1.png"
    alt="Seedy"
    width={50}
    height={50}
  />
);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<UserData | null>(null);
  const router = useRouter();
  React.useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login"); // Redirect to login page
        return;
      }

      try {
        const response = await userApiRequest.getUserInfo();
        const data = response.extensions.data;

        setUser({
          userId: data.userId || "",
          userName: data.userName || "Admin",
          email: data.email || "Not provided",
          phoneNumber: data.phoneNumber || "N/A",
          address: data.address || "No address available",
          avatar: data.avatar || "/avatar.png",
          roleName: data.roleName || "Customer",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
      }
    };

    if (envConfig.NEXT_PUBLIC_API_ENDPOINT) {
      fetchUserData();
    }
  }, []);

  // Sample data
  const data = {
    user: {
      name: user?.userName || "Guest",
      email: user?.email || "m@example.com",
      avatar: user?.avatar || "/avatar.png",
    },
    teams: [
      {
        name: "SEEDY",
        logo: () => <SeedyLogoComponent />, // Ensure it's a valid React component
        plan: "Premium",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: ChartArea,
      },
      {
        title: "Người dùng",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Sản phẩm",
        url: "/dashboard/products",
        icon: PackageSearch,
      },
      {
        title: "Đơn hàng",
        url: "/dashboard/orders",
        icon: Truck,
      },
      {
        title: "Thanh toán",
        url: "/dashboard/payments",
        icon: CreditCard,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
