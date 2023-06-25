import React, { useState } from "react";

export default function Header() {
  const [allMemeImages, setAllMemeImages] = useState([]);
  const [memeImage, setMemeImage] = useState({
    topText: "",
    bottomText: "",
    randomURL: "https://i.imgflip.com/46e43q.png",
  });

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemeImages(data.data.memes);
    }
    getMemes();
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    setMemeImage((prevState) => ({ ...prevState, randomURL: url }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemeImage((prevState) => ({ ...prevState, [name]: value }));
    console.log("in handle chage");
  };

  return (
    <main>
      <div className="input-div">
        <input
          type="text"
          className="input-text"
          placeholder="Top text"
          name="topText"
          value={memeImage.topText}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          className="input-text"
          placeholder="Bottom text"
          name="bottomText"
          value={memeImage.bottomText}
          onChange={handleChange}
        ></input>
        <button className="button" onClick={getMemeImage}>
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <img src={memeImage.randomURL} className="meme-image" />
        <h2 className="meme-text top">{memeImage.topText}</h2>
        <h2 className="meme-text bottom">{memeImage.bottomText}</h2>
      </div>
    </main>
  );
}
