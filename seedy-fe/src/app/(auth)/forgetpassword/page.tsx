"use client";

import Header from "@/components/header/header";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import styles from "./password.module.css";

export default function ForgetPassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <>
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.container}>
          <Tabs defaultValue="reset">
            <TabsContent value="reset" className={styles.tabsContent}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <h1 className={styles.title}>RESET PASSWORD</h1>

                  <div className="space-y-6">
                    {/* Nhập mật khẩu mới */}
                    <div className={styles.inputContainer}>
                      <LockIcon className={styles.icon} />
                      <Input
                        type={showPassword ? "text" : "password"}
                        className={styles.input}
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div
                        className={`${styles.iconRight} right-4 cursor-pointer`}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                      </div>
                    </div>

                    {/* Xác nhận mật khẩu mới */}
                    <div className={styles.inputContainer}>
                      <LockIcon className={styles.icon} />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        className={styles.input}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div
                        className={`${styles.iconRight} right-4 cursor-pointer`}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                      </div>
                    </div>

                    <div className={styles.buttonContainer}>
                      <Button className={styles.resetButton}>
                        RESET PASSWORD
                      </Button>
                    </div>

                    <p className={styles.signInText}>
                      <span className="text-[#234014]">
                        Remember your password?
                      </span>{" "}
                      <button className="font-bold text-[#4c6f29] underline">
                        Sign in
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
