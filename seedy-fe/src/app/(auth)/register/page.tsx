"use client";
import Header from "@/components/header/header";
import styles from "./register.module.css";
import RegisterForm from "@/app/(auth)/register/register-form";

export default function RegisterPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <RegisterForm />
      </div>
    </div>
  );
}
