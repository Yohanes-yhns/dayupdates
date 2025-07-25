import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './Login.module.css';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    if (!res.user.emailVerified) {
      Swal.fire({
        icon: "warning",
        title: "Email Belum Diverifikasi",
        text: "Silakan cek email untuk verifikasi akun Anda.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Berhasil Login",
      showConfirmButton: false,
      timer: 1500,
    });

    localStorage.setItem("user", JSON.stringify(res.user));
    window.location.href = "/";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal Login",
      text: error.message,
    });
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <h2 className={styles.title}>Masuk ke Akun Anda</h2>
          <p className={styles.subtitle}>
            Belum punya akun?{" "}
            <Link to="/signup" className={styles.link}>
              Daftar akun baru
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Alamat Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Email Anda"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.rememberContainer}>
            <div>
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className={styles.checkbox}
              />
              <label htmlFor="remember">Ingat saya</label>
            </div>
            <Link to="/forgot-password" className={styles.link}>Lupa password?</Link>
          </div>

          <button
            type="submit"
            className={styles.button}
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;