"use client";
import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
} from "lucide-react";
import styles from "./register.module.css";
import envConfig from "./../../../config";
import { useState } from "react";

// Form validation schema
const formSchema = z
  .object({
    userName: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().regex(/^(\+?0?\d{9,14})$/, "Invalid phone number"),
    address: z.string().optional(),
    dateOfBirth: z.string().refine(
      (dateStr) => {
        const birthDate = new Date(dateStr);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        return age >= 18;
      },
      { message: "Must be at least 18 years old" }
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      dateOfBirth: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 onSubmit function called"); // Check if function executes
    console.log(form.formState.errors);
    console.log("Form submitted with values:", values);

    setIsLoading(true);
    setError("");
    console.log("API Endpoint:", envConfig.NEXT_PUBLIC_API_ENDPOINT);
    try {
      console.log("✅ Form values submitted:", values); // Check form values

      const requestBody = {
        userName: values.userName,
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber || "0914725555",
        address: values.address || "Test1",
        dateOfBirth: values.dateOfBirth
          ? new Date(values.dateOfBirth).toISOString()
          : "2000-02-10T18:28:29.450Z",
      };

      console.log("📦 Request Body:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(
        `https://seedbe-cdhggmh7h0hef3ff.eastasia-01.azurewebsites.net/api/Auth/sign-up`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("📡 Response Status:", response.status);

      const responseBody = await response.json();
      console.log("📜 Response Body:", responseBody);

      if (!response.ok) {
        throw new Error(
          `Registration failed: ${response.status} - ${
            responseBody.message || response.statusText
          }`
        );
      }

      if (responseBody.statusCode === 200) {
        console.log("✅ Registration successful! Redirecting...");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("❌ Error occurred:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
      console.log("🔄 Request completed.");
    }
  }

  return (
    <Tabs defaultValue="account">
      <TabsContent value="account" className={styles.tabsContent}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <h1 className={styles.title}>CREATE YOUR ACCOUNT</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem className={styles.inputContainer}>
                      <UserIcon className={styles.icon} />
                      <FormControl>
                        <Input
                          className={styles.input}
                          placeholder="Username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className={styles.inputContainer}>
                      <UserIcon className={styles.icon} />
                      <FormControl>
                        <Input
                          className={styles.input}
                          placeholder="Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className={styles.inputContainer}>
                      <MailIcon className={styles.icon} />
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

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className={styles.inputContainer}>
                      <PhoneIcon className={styles.icon} />
                      <FormControl>
                        <Input
                          className={styles.input}
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className={styles.inputContainer}>
                      <MapPinIcon className={styles.icon} />
                      <FormControl>
                        <Input
                          className={styles.input}
                          placeholder="Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className={styles.inputContainer}>
                      <CalendarIcon className={styles.icon} />
                      <FormControl>
                        <Input
                          type="date"
                          className={styles.input}
                          placeholder="Date of Birth"
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
                          placeholder="Confirm Your Password"
                          {...field}
                        />
                      </FormControl>
                      <EyeOffIcon
                        className={`${styles.iconRight} right-4 cursor-pointer`}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="text-red-500 text-center mb-4">{error}</div>
                )}

                <div className={styles.buttonContainer}>
                  <Button
                    type="submit"
                    className={styles.registerButton}
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "REGISTER"}
                  </Button>
                </div>

                <p className={styles.signInText}>
                  <span className="text-[#234014]">
                    Already have an account?
                  </span>{" "}
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/login")}
                    className="font-bold text-[#4c6f29] underline"
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
  );
}
