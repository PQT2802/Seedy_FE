import Header from "@/components/header/header";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Apple,
  Chrome,
  EyeOffIcon,
  Facebook,
  LockIcon,
  UserIcon,
} from "lucide-react";
import styles from "./login.module.css";

const socialLoginOptions = [
  { icon: Apple, alt: "Apple login" },
  { icon: Facebook, alt: "Facebook login" },
  { icon: Chrome, alt: "Google login" },
];

export default function Login() {
  return (
    <>
      <Header />
      <div className={`${styles.container} flex justify-center`}>
        <Tabs defaultValue="account">
          <TabsContent value="account" className={styles.tabsContent}>
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <h1 className={styles.title}>LOGIN</h1>

                <div className="space-y-6">
                  {/* Email/Phone Input */}
                  <div className={styles.inputContainer}>
                    <UserIcon className={styles.icon} />
                    <Input
                      className={styles.input}
                      placeholder="Enter Your Email/Phone Number"
                    />
                  </div>

                  {/* Password Input */}
                  <div className={styles.inputContainer}>
                    <LockIcon className={styles.icon} />
                    <Input
                      type="password"
                      className={styles.input}
                      placeholder="Enter Your Password"
                    />
                    <EyeOffIcon
                      className={`${styles.icon} right-4 cursor-pointer`}
                    />
                  </div>

                  {/* Remember Me */}
                  <div className={styles.rememberContainer}>
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className={styles.rememberLabel}>
                      Remember me
                    </label>
                  </div>

                  {/* Login Button */}
                  <div>
                    <Button className={styles.loginButton}>LOGIN</Button>
                  </div>

                  {/* Sign Up Link */}
                  <p className={styles.signUpText}>
                    <span className="text-[#234014]">No account yet?</span>{" "}
                    <button className="font-bold text-[#4c6f29] underline">
                      Sign up
                    </button>
                  </p>

                  {/* Social Logins */}
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
