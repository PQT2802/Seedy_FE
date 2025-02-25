import http from "@/lib/http";

// ✅ Định nghĩa kiểu dữ liệu API Response
interface ViettelPostResponse<T> {
  statusCode: number;
  title: string;
  type: string;
  payload: { Data: { $values: T } }; // ✅ Fix: Lấy dữ liệu từ `$values`
}

// ✅ Kiểu dữ liệu cho Province, District, Ward
interface Province {
  PROVINCE_ID: number;
  PROVINCE_CODE: string;
  PROVINCE_NAME: string;
}

interface District {
  DISTRICT_ID: number;
  DISTRICT_NAME: string;
  PROVINCE_ID: number;
}

interface Ward {
  WARDS_ID: number;
  WARDS_NAME: string;
  DISTRICT_ID: number;
}

// ✅ Kiểu dữ liệu cho Shipping Price
interface ShippingService {
  MA_DV_CHINH: string;
  TEN_DICHVU: string;
  GIA_CUOC: number;
  THOI_GIAN: string;
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
  login: async (): Promise<string | null> => {
    try {
      const response = await http.post<
        ViettelPostResponse<{ userId: number; token: string }>
      >("/api/ViettelPost/login", {
        username: "dotrong159357@gmail.com",
        password: "T0931444875.",
      });

      // 🛠 Fix: Lấy token từ `payload`
      const token = response.payload?.token;
      if (token) {
        saveToken(token);
        return token;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    return null;
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
      const response = await http.get<ViettelPostResponse<Province[]>>(
        "/api/ViettelPost/provinces",
        { headers: { Token: token } }
      );

      return response.payload.Data.$values ?? [];
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
      const response = await http.get<ViettelPostResponse<District[]>>(
        `/api/ViettelPost/districts/${provinceId}`,
        { headers: { Token: token } }
      );

      return response.payload.Data.$values ?? [];
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
      const response = await http.get<ViettelPostResponse<Ward[]>>(
        `/api/ViettelPost/wards/${districtId}`,
        { headers: { Token: token } }
      );

      return response.payload.Data.$values ?? [];
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
      const response = await http.post<ViettelPostResponse<ShippingService[]>>(
        "/api/ViettelPost/shipping-price",
        data,
        { headers: { Token: token } }
      );
      console.log("Shipping Price API Response:", response); // ✅ Debug API response

      return response.payload.RESULT.$values ?? [];
    } catch (error) {
      console.error("Error fetching shipping price:", error);
      return [];
    }
  },
};

export default viettelPostApi;
