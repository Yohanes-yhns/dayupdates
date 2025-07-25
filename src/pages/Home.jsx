import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import styles from "./Home.module.css";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("general");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

        const response = await fetch(
          `https://gnews.io/api/v4/top-headlines?lang=en&topic=${selectedCategory}&token=${apiKey}`
        );

        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Gagal memuat berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/dayupdateslogo.png" alt="Day Updates Logo" className={styles.logo} />
      </div>

      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`${styles.category} ${
              selectedCategory === category
                ? styles.categoryActive
                : styles.categoryInactive
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.pulse}></div>
        </div>
      ) : articles.length === 0 ? (
        <div className={styles.empty}>
          Tidak ada berita yang ditemukan untuk kategori ini.
        </div>
      ) : (
        <div className={styles.grid}>
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              image={article.image}
              url={article.url}
              source={article.source?.name}
              date={article.publishedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
