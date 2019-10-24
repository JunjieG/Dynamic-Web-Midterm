import React from 'react'
import './card.css'

export default function NewsCard({
  data = {}
}) {
  const url = "article/" + data.id
  return (
    <div className="card">
      <div className="article_info">
        <h2>{data.title}</h2>
        <p>{data.publishedAt}</p>
        <p>{data.description}</p>
        <a href={data.url}>Read More</a>
      </div>
    </div>
  );
}
