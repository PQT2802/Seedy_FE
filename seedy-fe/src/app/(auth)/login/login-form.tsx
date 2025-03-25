"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Apple,
  Chrome,
  EyeOffIcon,
  Facebook,
  LockIcon,
  UserIcon,
} from "lucide-react";
import styles from "./login.module.css";
import authApiRequest from "@/apiRequests/auth";
import Notice from "@/components/pop-up/notification";

// Thêm schema cho form quên mật khẩu
const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const socialLoginOptions = [
  { icon: Apple, alt: "Apple login" },
  { icon: Facebook, alt: "Facebook login" },
  { icon: Chrome, alt: "Google login" },
];

// Form validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showForgetPassword, setShowForgetPassword] = React.useState(false); // Trạng thái popup quên mật khẩu
  const [notice, setNotice] = React.useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const router = useRouter();

  // Form chính để đăng nhập
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Form cho quên mật khẩu
  const forgetForm = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await authApiRequest.login({
        Email: values.email,
        Password: values.password,
      });

      if (!response.extensions.data?.accessToken) {
        throw new Error("Login failed: Invalid response from server");
      }

      localStorage.setItem("accessToken", response.extensions.data.accessToken);
      setNotice({
        isOpen: true,
        type: "success",
        message: "Login successful!",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setNotice({
        isOpen: true,
        type: "error",
        message: `Login failed: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Xử lý gửi yêu cầu quên mật khẩu
  async function onForgetPasswordSubmit(
    values: z.infer<typeof forgetPasswordSchema>
  ) {
    setIsLoading(true);
    try {
      // Gọi API quên mật khẩu (cần thêm phương thức này vào authApiRequest)
      await authApiRequest.forgetPassword({
        Email: values.email,
      });
      setNotice({
        isOpen: true,
        type: "success",
        message: "Reset password email sent successfully!",
      });
      setShowForgetPassword(false); // Đóng popup sau khi gửi thành công
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
      <Tabs defaultValue="account">
        <TabsContent value="account" className={styles.tabsContent}>
          <Card className={styles.card}>
            <CardContent className={styles.cardContent}>
              <h1 className={styles.title}>LOGIN</h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Email Input */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className={styles.inputContainer}>
                        <UserIcon className={styles.icon} />
                        <FormControl>
                          <Input
                            className={styles.input}
                            placeholder="Enter Your Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Input */}
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
                            placeholder="Enter Your Password"
                            {...field}
                          />
                        </FormControl>
                        <EyeOffIcon
                          className={`${styles.iconRight} right-4 cursor-pointer`}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remember Me và Forgot Password */}
                  <div className="flex justify-between items-center">
                    <div className={styles.rememberContainer}>
                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <>
                            <Checkbox
                              id="remember"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <label
                              htmlFor="remember"
                              className={styles.rememberLabel}
                            >
                              Remember me
                            </label>
                          </>
                        )}
                      />
                    </div>
                    <button
                      type="button"
                      className="text-[#234014] font-bold underline"
                      onClick={() => setShowForgetPassword(true)}
                    >
                      Forgot Password
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className={styles.buttonContainer}>
                    <Button
                      type="submit"
                      className={styles.loginButton}
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "LOGIN"}
                    </Button>
                  </div>

                  {/* Sign Up Link */}
                  <p className={styles.signUpText}>
                    <span className="text-[#234014]">No account yet?</span>{" "}
                    <button
                      className="font-bold text-[#4c6f29] underline"
                      onClick={() => router.push("/register")}
                    >
                      Sign up
                    </button>
                  </p>

                  {/* Social Login */}
                  <div className={styles.socialLoginContainer}>
                    <p className={styles.socialLoginText}>Or login with:</p>
                    <div className="flex justify-center gap-6">
                      {socialLoginOptions.map((Social, index) => (
                        <button
                          key={index}
                          className={styles.socialLoginButton}
                          aria-label={Social.alt}
                        >
                          <Social.icon className="w-6 h-6 text-[#234014]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Popup Forgot Password */}
      {showForgetPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className={`${styles.card} max-w-md`}>
            <CardContent className={styles.cardContent}>
              <h1 className={styles.title}>FORGOT PASSWORD</h1>
              <Form {...forgetForm}>
                <form
                  onSubmit={forgetForm.handleSubmit(onForgetPasswordSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={forgetForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className={styles.inputContainer}>
                        <UserIcon className={styles.icon} />
                        <FormControl>
                          <Input
                            className={styles.input}
                            placeholder="Enter Your Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className={styles.buttonContainer}>
                    <Button
                      type="submit"
                      className={styles.loginButton}
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "SEND RESET LINK"}
                    </Button>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button
                      type="button"
                      className={styles.loginButton}
                      onClick={() => setShowForgetPassword(false)}
                    >
                      CANCEL
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
