// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import styles from "./ForgotPassword.module.css"; // opsional jika ingin styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Email Dikirim",
        text: "Silakan cek email Anda untuk mengatur ulang password.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.message,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleResetPassword} className={styles.card}>
        <h2>Reset Password</h2>
        <p>Masukkan email Anda untuk mengatur ulang password</p>
        <input
          type="email"
          placeholder="Email Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Kirim Email Reset
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
