import Header from "@/components/header/header";
import styles from "./login.module.css";
import LoginForm from "@/app/(auth)/login/login-form";

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <LoginForm />
      </div>
    </div>
  );
}
