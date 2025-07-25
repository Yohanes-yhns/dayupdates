import React from "react";
import styles from "./NewsCard.module.css";

const NewsCard = ({ title, description, image, url, source, date }) => {
  const formatDate = (dateString) => {
    const options = { 
      day: "numeric", 
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={image || "https://via.placeholder.com/800x500?text=No+Image"}
          alt={title}
          className={styles.image}
        />
        <div className={styles.overlay}></div>
        <div className={styles.meta}>
          <span className={styles.source}>{source || "Unknown"}</span>
          <span className={styles.date}>{formatDate(date)}</span>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          {description || "Tidak ada deskripsi yang tersedia."}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Baca Selengkapnya
        </a>
      </div>
    </div>
  );
};

export default NewsCard;