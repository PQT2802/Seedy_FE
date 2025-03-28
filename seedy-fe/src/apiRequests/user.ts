import http from "@/lib/https";

// Định nghĩa interface cho dữ liệu user từ API response
export interface UserData {
  userId: string;
  userName: string;
  email: string;
  roleName: string;
  phoneNumber: string;
  address: string;
  avatar: string;
}

const userApiRequest = {
  // Hàm lấy thông tin user từ API
  getUserInfo: () => http.get<UserData>("api/User/user-infor"),
};

export default userApiRequest;
