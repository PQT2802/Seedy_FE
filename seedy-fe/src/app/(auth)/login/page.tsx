import { Header } from "@/components/header/header";
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
const socialLoginOptions = [
  { icon: Apple, alt: "Apple login" },
  { icon: Facebook, alt: "Facebook login" },
  { icon: Chrome, alt: "Google login" },
];
export default function Login() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen bg-[#234014]">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsContent value="account">
            <Card className="w-[500px] max-w-full bg-white rounded-[20px] shadow-lg">
              <CardContent className="p-10">
                <h1 className="text-center text-[40px] font-bold text-[#234014] font-mantra mb-10">
                  LOGIN
                </h1>

                <div className="space-y-6">
                  {/* Email/Phone Input */}
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] text-[#234014]" />
                    <Input
                      className="h-[60px] pl-14 pr-4 rounded-lg border border-[#234014] text-lg text-[#234014] font-mantra"
                      placeholder="Enter Your Email/Phone Number"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] text-[#234014]" />
                    <Input
                      type="password"
                      className="h-[60px] pl-14 pr-14 rounded-lg border border-[#234014] text-lg text-[#234014] font-mantra"
                      placeholder="Enter Your Password"
                    />
                    <EyeOffIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#234014] cursor-pointer" />
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      className="w-[18px] h-[18px] border border-[#234014] rounded-sm"
                    />
                    <label
                      htmlFor="remember"
                      className="text-[#234014] text-lg font-medium font-mantra"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* Login Button */}
                  <div className="text-center">
                    <Button className="w-full h-[50px] text-lg font-bold text-white bg-[#234014] rounded-lg hover:bg-[#1c3310] font-mantra">
                      LOGIN
                    </Button>
                  </div>

                  {/* Sign Up Link */}
                  <p className="text-center text-lg font-mantra">
                    <span className="text-[#234014]">No account yet?</span>{" "}
                    <button className="font-bold text-[#4c6f29] underline">
                      Sign up
                    </button>
                  </p>

                  {/* Social Logins */}
                  <div className="text-center">
                    <p className="text-[#234014] text-lg mb-4 font-mantra">
                      Or login with:
                    </p>
                    <div className="flex justify-center gap-6">
                      {socialLoginOptions.map((Social, index) => (
                        <button
                          key={index}
                          className="w-[40px] h-[40px] flex items-center justify-center bg-white border border-[#234014] rounded-full"
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

