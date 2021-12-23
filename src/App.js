import React, { useState, useRef } from "react";
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
  const typingTimeoutRef = useRef(null);

  const search = async (key) => {
    const res = await getImages(key);
    setImages(res);
  };

  const updateQuery = (e) => {
    setQuery(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const searchTerm = e.target.value;
      search(searchTerm);
      console.log(searchTerm);
    }, 800);
  };

  return (
    <div className="App">
      <div className="form">
        <input
          id="query"
          type="text"
          value={query}
          onChange={updateQuery}
          placeholder="Type to search"
        />
      </div>
      <div className="flex">
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
