import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) =>
    http.post<LoginResType>("api/Auth/sign-in", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("api/Auth/register", body),
  logout: (sessionToken: string) =>
    http.post<MessageResType>(
      "/Auth/logout",
      {},
      { headers: { Authorization: `Bearer ${sessionToken}` } }
    ),
  refreshSession: (sessionToken: string) =>
    http.post(
      "/auth/slide-session",
      {},
      { headers: { Authorization: `Bearer ${sessionToken}` } }
    ),
};

export default authApiRequest;
