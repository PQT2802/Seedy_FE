"use client";
import Header from "@/components/header/header";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import styles from "./register.module.css";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false); // Trạng thái hiển thị mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  return (
    <>
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.container}>
          <Tabs defaultValue="account">
            <TabsContent value="account" className={styles.tabsContent}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <h1 className={styles.title}>CREATE YOUR ACCOUNT</h1>

                  <div className="space-y-6">
                    <div className={styles.nameContainer}>
                      <div className={styles.inputContainer}>
                        <UserIcon className={styles.icon} />
                        <Input
                          className={styles.input}
                          placeholder="Last Name"
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <UserIcon className={styles.icon} />
                        <Input className={styles.input} placeholder="Name" />
                      </div>
                    </div>

                    <div className={styles.inputContainer}>
                      <MailIcon className={styles.icon} />
                      <Input
                        className={styles.input}
                        placeholder="Enter Your Email"
                      />
                    </div>

                    <div className={styles.inputContainer}>
                      <LockIcon className={styles.icon} />
                      <Input
                        type={showPassword ? "text" : "password"} // Chuyển đổi giữa password và text
                        className={styles.input}
                        placeholder="Enter Your Password"
                      />
                      <div
                        className={`${styles.iconRight} right-4 cursor-pointer`}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                      </div>
                    </div>

                    <div className={styles.inputContainer}>
                      <LockIcon className={styles.icon} />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        className={styles.input}
                        placeholder="Confirm Your Password"
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
                      <Button className={styles.registerButton}>
                        REGISTER
                      </Button>
                    </div>

                    <p className={styles.signInText}>
                      <span className="text-[#234014]">
                        Already have an account?
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
