import http from "@/lib/https";

// ✅ Kiểu dữ liệu cho Province, District, Ward
// Kiểu dữ liệu cho Province, District, Ward (khớp với BE)
interface Province {
  provinceId: number;
  provinceCode: string;
  provinceName: string;
}

interface District {
  districtId: number;
  districtName: string;
  provinceId: number;
}

interface Ward {
  wardId: number;
  wardName: string;
  districtId: number;
}

// ✅ Kiểu dữ liệu cho Shipping Price
// ✅ Kiểu dữ liệu cho Shipping Price (cập nhật khớp với BE)
interface ShippingService {
  maDvChinh: string;
  tenDichVu: string;
  giaCuoc: number;
  thoiGian: string;
  exchangeWeight: number;
  extraServices: Array<{
    serviceCode: string;
    serviceName: string;
    description: string | null;
  }>;
}

// ✅ Request body for shipping price API
interface ShippingPriceRequest {
  SENDER_ADDRESS: string;
  RECEIVER_ADDRESS: string;
  PRODUCT_TYPE: string;
  PRODUCT_WEIGHT: number;
  PRODUCT_PRICE: number;
  MONEY_COLLECTION: string;
  PRODUCT_LENGTH: number;
  PRODUCT_WIDTH: number;
  PRODUCT_HEIGHT: number;
  TYPE: number;
}

// ✅ Lưu và lấy Token từ localStorage
const saveToken = (token: string) => {
  if (token) {
    localStorage.setItem("viettel_token", token);
  }
};

const getToken = (): string | undefined => {
  return localStorage.getItem("viettel_token") ?? undefined;
};

// ✅ API Requests for ViettelPost
const viettelPostApi = {
  // 🔹 Gọi API login
  login: async (): Promise<string | undefined> => {
    try {
      const response = await http.post<{ userId: number; token: string }>(
        "/api/ViettelPost/login",
        {
          USERNAME: "dotrong159357@gmail.com",
          PASSWORD: "T0931444875.",
        }
      );

      console.log("Login Response:", response);
      const token = response.extensions.data.token;
      console.log("Extracted Token:", token);

      if (token) {
        saveToken(token);
        return token;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    return undefined;
  },

  // 🔹 Gọi API lấy danh sách tỉnh
  getProvinces: async (): Promise<Province[]> => {
    let token = getToken();
    if (!token) {
      token = await viettelPostApi.login();
    }

    if (!token) {
      console.error("Failed to fetch provinces: No token available");
      return [];
    }

    try {
      const response = await http.get<Province[]>(
        "/api/ViettelPost/provinces",
        { headers: { Token: token } }
      );
      console.log("Provinces Response:", response); // Log để kiểm tra dữ liệu
      const data = response.extensions.data;
      // Đảm bảo dữ liệu là mảng, nếu không thì trả về mảng rỗng
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching provinces:", error);
      return [];
    }
  },

  // 🔹 Gọi API lấy danh sách quận/huyện
  getDistricts: async (provinceId: number): Promise<District[]> => {
    let token = getToken();
    if (!token) {
      token = await viettelPostApi.login();
    }

    if (!token) {
      console.error("Failed to fetch districts: No token available");
      return [];
    }

    try {
      const response = await http.get<District[]>(
        `/api/ViettelPost/districts/${provinceId}`,
        { headers: { Token: token } }
      );
      const data = response.extensions.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching districts:", error);
      return [];
    }
  },

  // 🔹 Gọi API lấy danh sách phường/xã
  getWards: async (districtId: number): Promise<Ward[]> => {
    let token = getToken();
    if (!token) {
      token = await viettelPostApi.login();
    }

    if (!token) {
      console.error("Failed to fetch wards: No token available");
      return [];
    }

    try {
      const response = await http.get<Ward[]>(
        `/api/ViettelPost/wards/${districtId}`,
        { headers: { Token: token } }
      );
      const data = response.extensions.data;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching wards:", error);
      return [];
    }
  },

  // 🔹 Gọi API lấy giá vận chuyển
  getShippingPrice: async (
    data: ShippingPriceRequest
  ): Promise<ShippingService[]> => {
    let token = getToken();
    if (!token) {
      token = await viettelPostApi.login();
    }

    if (!token) {
      console.error("Failed to fetch shipping price: No token available");
      return [];
    }

    try {
      const response = await http.post<ShippingService[]>(
        "/api/ViettelPost/shipping-price",
        data,
        { headers: { Token: token } }
      );
      console.log("Shipping Price Response:", response);
      const shippingData = response.extensions.data;
      return Array.isArray(shippingData) ? shippingData : [];
    } catch (error) {
      console.error("Error fetching shipping price:", error);
      return [];
    }
  },
};

export default viettelPostApi;
