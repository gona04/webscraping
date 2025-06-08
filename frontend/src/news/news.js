import React, { useEffect, useState } from "react";
import './news.css';
function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/news")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data.data);
        setNews(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="app-container">
      <ul>
        {news.map((d, i) => {
          return <li className="news-item" key={i}>{d}</li>;
        })}
      </ul>
    </div>
  );
}

export default News;
