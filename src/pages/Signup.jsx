import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const passwordsMatch =
    formData.password && formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi dasar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return Swal.fire({
        icon: "warning",
        title: "Email tidak valid",
        text: "Harap masukkan alamat email yang benar.",
      });
    }

    if (formData.password.length < 6) {
      return Swal.fire({
        icon: "warning",
        title: "Password terlalu pendek",
        text: "Password minimal 6 karakter.",
      });
    }

    if (!passwordsMatch) {
      return Swal.fire({
        icon: "warning",
        title: "Password tidak cocok",
        text: "Pastikan konfirmasi password sama.",
      });
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Simpan ke Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
        provider: "email",
      });

      await sendEmailVerification(res.user);

      Swal.fire({
        icon: "success",
        title: "Berhasil Daftar",
        text: "Verifikasi email kamu dulu sebelum login.",
      });

      window.location.href = "/login";
    } catch (error) {
      let message = "Terjadi kesalahan";

      if (error.code === "auth/email-already-in-use") {
        message = "Email sudah terdaftar. Gunakan email lain.";
      } else if (error.code === "auth/invalid-email") {
        message = "Format email salah.";
      } else if (error.code === "auth/weak-password") {
        message = "Password terlalu lemah.";
      }

      Swal.fire({
        icon: "error",
        title: "Gagal Daftar",
        text: message,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <h2 className={styles.title}>Buat Akun Baru</h2>
          <p className={styles.subtitle}>
            Sudah punya akun?{" "}
            <Link to="/login" className={styles.link}>
              Masuk di sini
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nama Lengkap
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Nama Anda"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Alamat Email
            </label>
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
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
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

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              placeholder="••••••••"
            />
            {formData.confirmPassword && (
              <p
                className={
                  passwordsMatch
                    ? styles.passwordMatch
                    : styles.passwordMismatch
                }
              >
                {passwordsMatch ? "Password cocok!" : "Password tidak cocok"}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!passwordsMatch}
          >
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
