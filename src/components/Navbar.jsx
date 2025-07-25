import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        Swal.fire({
          icon: "success",
          title: "Berhasil Logout",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Logout Gagal",
          text: error.message,
        });
      });
  };


  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/">
        <img src="/dayupdateslogo.png" alt="Day Updates Logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.right}>
        {!user ? (
          <>
            <Link to="/login" className={styles.link}>Masuk</Link>
            <Link to="/signup" className={`${styles.link} ${styles.signup}`}>Daftar</Link>
          </>
        ) : (
          <button onClick={handleLogout} className={styles.link}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
