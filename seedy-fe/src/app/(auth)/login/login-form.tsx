"use client";

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
import envConfig from "./../../../config";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");

    try {
      console.log("API Endpoint:", envConfig.NEXT_PUBLIC_API_ENDPOINT);

      const response = await fetch(
        // `https://seedbe-cdhggmh7h0hef3ff.eastasia-01.azurewebsites.net/api/Auth/sign-in`,
        `https://localhost:7179/api/Auth/sign-in`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      const responseBody = await response.json();
      console.log("Response Body:", responseBody);

      if (!response.ok) {
        throw new Error(
          `Login failed: ${response.status} - ${
            responseBody.message || response.statusText
          }`
        );
      }

      // If the login is successful (status 200), store the accessToken and redirect to home page
      if (responseBody.statusCode === 200) {
        localStorage.setItem(
          "accessToken",
          responseBody.extensions.data.accessToken
        );
        window.location.href = "/"; // Redirect to home page
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
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
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={styles.inputContainer}>
                      <UserIcon className={styles.icon} />
                      <FormControl>
                        <Input
                          className={styles.input}
                          placeholder="Enter Your Email/Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <div className={styles.rememberContainer}>
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <React.Fragment>
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
                      </React.Fragment>
                    )}
                  />
                </div>

                <div className={styles.buttonContainer}>
                  <Button
                    type="submit"
                    className={styles.loginButton}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "LOGIN"}
                  </Button>
                </div>

                <p className={styles.signUpText}>
                  <span className="text-[#234014]">No account yet?</span>{" "}
                  <button className="font-bold text-[#4c6f29] underline">
                    Sign up
                  </button>
                </p>

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
