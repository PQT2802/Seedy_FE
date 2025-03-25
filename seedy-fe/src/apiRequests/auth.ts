import http from "@/lib/https";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  // Phương thức login
  login: (body: LoginBodyType) =>
    http.post<{ accessToken: string; reNewToken: string }>(
      "/api/Auth/sign-in",
      body
    ),

  // Phương thức register
  register: (body: RegisterBodyType) =>
    http.post<{ message: string }>("/api/Auth/sign-up", body),

  // Phương thức logout
  logout: (sessionToken: string) =>
    http.post<MessageResType>(
      "/Auth/logout",
      {},
      { headers: { Authorization: `Bearer ${sessionToken}` } }
    ),

  // Phương thức refreshSession
  refreshSession: (sessionToken: string) =>
    http.post<{ accessToken: string; reNewToken: string }>(
      "/auth/slide-session",
      {},
      { headers: { Authorization: `Bearer ${sessionToken}` } }
    ),

  // Phương thức forget password
  forgetPassword: (body: { Email: string }) =>
    http.post<MessageResType>("/api/Auth/forget-password", body),

  // Phương thức reset password
  resetPassword: (body: {
    Email: string;
    Token: string;
    NewPassword: string;
  }) => http.post<MessageResType>("/api/Auth/reset-password", body),
};

export default authApiRequest;
