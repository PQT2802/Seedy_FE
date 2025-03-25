"use client";

import Header from "@/components/header/header";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Thêm useSearchParams để lấy query
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import styles from "./password.module.css";
import authApiRequest from "@/apiRequests/auth";
import Notice from "@/components/pop-up/notification";

// Schema xác thực form reset password
const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ForgetPassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [notice, setNotice] = React.useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams(); // Lấy query params từ URL

  // Lấy token và email từ URL
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // Khởi tạo form với react-hook-form
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Xử lý gửi yêu cầu reset mật khẩu
  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    if (!token || !email) {
      setNotice({
        isOpen: true,
        type: "error",
        message: "Invalid reset link. Please request a new one.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApiRequest.resetPassword({
        Email: email,
        Token: token,
        NewPassword: values.password,
      });

      setNotice({
        isOpen: true,
        type: "success",
        message: "Password reset successfully!",
      });

      // Chuyển hướng về trang login sau 2 giây
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setNotice({
        isOpen: true,
        type: "error",
        message: "Failed to reset password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Notice
        isOpen={notice.isOpen}
        onClose={() => setNotice({ ...notice, isOpen: false })}
        type={notice.type as "success" | "error"}
        message={notice.message}
      />
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.container}>
          <Tabs defaultValue="reset">
            <TabsContent value="reset" className={styles.tabsContent}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <h1 className={styles.title}>RESET PASSWORD</h1>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Nhập mật khẩu mới */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className={styles.inputContainer}>
                            <LockIcon className={styles.icon} />
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                className={styles.input}
                                placeholder="Enter New Password"
                                {...field}
                              />
                            </FormControl>
                            <div
                              className={`${styles.iconRight} right-4 cursor-pointer`}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Xác nhận mật khẩu mới */}
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem className={styles.inputContainer}>
                            <LockIcon className={styles.icon} />
                            <FormControl>
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                className={styles.input}
                                placeholder="Confirm New Password"
                                {...field}
                              />
                            </FormControl>
                            <div
                              className={`${styles.iconRight} right-4 cursor-pointer`}
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeIcon />
                              ) : (
                                <EyeOffIcon />
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className={styles.buttonContainer}>
                        <Button
                          type="submit"
                          className={styles.resetButton}
                          disabled={isLoading}
                        >
                          {isLoading ? "Resetting..." : "RESET PASSWORD"}
                        </Button>
                      </div>

                      <p className={styles.signInText}>
                        <span className="text-[#234014]">
                          Remember your password?
                        </span>{" "}
                        <button
                          type="button"
                          className="font-bold text-[#4c6f29] underline"
                          onClick={() => router.push("/login")}
                        >
                          Sign in
                        </button>
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
