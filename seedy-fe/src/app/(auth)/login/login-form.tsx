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
// Import the fixed API request functions

const socialLoginOptions = [
  { icon: Apple, alt: "Apple login" },
  { icon: Facebook, alt: "Facebook login" },
  { icon: Chrome, alt: "Google login" },
];

// Form validation schema for login
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

// Form validation schema for forgot password
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onLoginSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");
    try {
      const response = await authApiRequest.login({
        Email: values.email,
        Password: values.password,
      });
      if (!response.extensions.data?.accessToken) {
        throw new Error("Login failed: Invalid response from server");
      }

      // Store token
      localStorage.setItem("accessToken", response.extensions.data.accessToken);
      console.log(response.extensions.data.accessToken);
      // ✅ Use Next.js router instead of window.location.href
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setNotice({
        isOpen: true,
        type: "fail",
        message: "Login failed. Please try again.",
      });
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onForgotPasswordSubmit(
    values: z.infer<typeof forgotPasswordSchema>
  ) {
    setIsLoading(true);
    setError("");
    try {
      const response = await authApiRequest.forgetPassword(values.email); // We'll define this API call next
      setShowForgotPassword(false);
      alert("A reset password link has been sent to your email.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
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

                {/* Remember Me */}
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
                  <button className="font-bold text-[#4c6f29] underline">
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
  );
}
