import React, { useState } from "react";
import "./App.css";

const getImages = async (query) => {
  const url = "https://photo-search-tool.ngoantr.workers.dev/";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { "Content-type": "application/json" },
  });
  return res.json();
};

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const search = async () => {
    const res = await getImages(query);
    setImages(res);
  };

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <div className="form">
        <input
          id="query"
          type="text"
          onChange={updateQuery}
          placeholder="Search"
        />
        <button onClick={search} type="submit">
          Search
        </button>
      </div>
      <div className='flex'>
        {images.map((image) => (
          <a key={image.id} href={image.link}>
            <img alt={image.description} src={image.image} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
