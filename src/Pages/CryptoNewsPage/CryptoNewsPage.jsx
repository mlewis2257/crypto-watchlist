import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import * as newsAPI from "../../Utilities/news-api";
import "./CryptoNewsPage.css";

const CryptoNewsPage = () => {
  const [news, setNews] = useState([]);
  function date(timeStamp) {
    const newDate = new Date(timeStamp).toLocaleDateString();
    return newDate;
  }

  useEffect(() => {
    async function getNewsData() {
      const newsData = await newsAPI.getNews();
      setNews(newsData);
    }
    getNewsData();
  }, []);
  const newsArticles = news.map((article) => {
    return (
      <div className="article-div">
        <h1>{article.title}</h1>
        <h3>{`Date Published: ${date(article.feedDate)}`}</h3>
        <Link to={article.link}>
          <img className="article-img" src={article.imgUrl} alt="article" />
        </Link>
      </div>
    );
  });
  return (
    <>
      <NavBar />
      <div className="news-container">{newsArticles}</div>
    </>
  );
};

export default CryptoNewsPage;
