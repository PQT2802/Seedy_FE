import envConfig from "@/config";
import { normalizePath } from "@/lib/utils";
import { redirect } from "next/navigation";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

// Định nghĩa các status code lỗi phổ biến
const BAD_REQUEST_STATUS = 400;
const AUTHENTICATION_ERROR_STATUS = 401;
const VALIDATION_ERROR_STATUS = 422;

// Định nghĩa payload cho lỗi chung
export type ErrorPayload = {
  type: string;
  title: string;
  status: number;
  errors?: {
    code: string;
    description: string;
    type: string;
  }[];
};

// Định nghĩa payload cho response thành công (Thêm export)
export type SuccessPayload<T> = {
  statusCode: number;
  title: string;
  type: string;
  extensions: {
    message: string;
    data: T;
  };
};

// Lớp lỗi chung
export class HttpError extends Error {
  status: number;
  payload: ErrorPayload;
  constructor({ status, payload }: { status: number; payload: ErrorPayload }) {
    super(payload.title || "Http Error");
    this.status = status;
    this.payload = payload;
  }
}

// Lớp lỗi validation
export class ValidationError extends HttpError {
  status: number;
  payload: ErrorPayload & {
    errors: { code: string; description: string; type: string }[];
  };
  constructor({
    status,
    payload,
  }: {
    status: number;
    payload: ErrorPayload & {
      errors: { code: string; description: string; type: string }[];
    };
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;
export const isClient = () => typeof window !== "undefined";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: { [key: string]: string } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
          Accept: "*/*",
        };

  if (isClient()) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  const payload = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (res.status === BAD_REQUEST_STATUS) {
      throw new ValidationError({
        status: res.status,
        payload: data.payload as ErrorPayload & {
          errors: { code: string; description: string; type: string }[];
        },
      });
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient()) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch("/api/auth/logout", {
            method: "POST",
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            } as any,
          });
          try {
            await clientLogoutRequest;
          } catch (error) {
            console.error("Logout failed:", error);
          } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("reNewToken");
            clientLogoutRequest = null;
            location.href = "/login";
          }
        }
      } else {
        const sessionToken = (options?.headers as any)?.Authorization?.split(
          "Bearer "
        )[1];
        redirect(`/logout?sessionToken=${sessionToken}`);
      }
    } else {
      throw new HttpError({
        status: res.status,
        payload: data.payload as ErrorPayload,
      });
    }
  }

  if (isClient()) {
    if (normalizePath(url) === "api/Auth/sign-in") {
      const { accessToken, reNewToken } = (
        payload as SuccessPayload<{ accessToken: string; reNewToken: string }>
      ).extensions.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("reNewToken", reNewToken);
    } else if (normalizePath(url) === "api/auth/logout") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("reNewToken");
    }
  }

  return data.payload as SuccessPayload<Response>;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, options);
  },
};

export default http;
