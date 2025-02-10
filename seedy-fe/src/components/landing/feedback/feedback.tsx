import React from "react";
import styles from "./feedback.module.css";

export default function Feedback() {
  return (
    <div className={`${styles.background}`}>
      <div className={`${styles.formContainer}`}>
        <h1 className={`${styles.heading}`}>Let&apos;s Contact</h1>
        <form className={`${styles.form}`}>
          <div className={`${styles.inputGroup}`}>
            <label htmlFor="name" className={`${styles.label}`}>
              Tên
            </label>
            <input type="text" id="name" className={`${styles.input}`} />
          </div>
          <div className={`${styles.inputGroup}`}>
            <label htmlFor="email" className={`${styles.label}`}>
              Email
            </label>
            <input type="email" id="email" className={`${styles.input}`} />
          </div>
          <div className={`${styles.inputGroup}`}>
            <label htmlFor="message" className={`${styles.label}`}>
              Lời Nhắn
            </label>
            <textarea
              id="message"
              className={`${styles.textarea}`}
              rows={4}
            ></textarea>
          </div>
          <div className="text-left">
            <button type="submit" className={`${styles.button}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
