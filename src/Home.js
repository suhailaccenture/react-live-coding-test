import "./App.css";

import { useHistory } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [isReady, setIsReady] = useState(false);
  const pokedexPath = "/pokedex";
  let history = useHistory();

  const onInputChange = (e) => {
    switch (e.target.value) {
      case "Ready!":
        setIsReady(true);
        break;
      default:
        setIsReady(false);
    }
  };

  const onImageClick = () => {
    history.push(pokedexPath);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={onImageClick}>
          <img
            hidden={!isReady}
            src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
            className="App-logo"
            alt="logo"
            style={{ padding: "10px" }}
          />
        </div>
        <b>
          Requirement: Try to show the hidden image and make it clickable that
          goes to /pokedex when the input below is "Ready!" remember to hide the
          red text away when "Ready!" is in the textbox.
        </b>
        <p>Are you ready to be a pokemon master?</p>
        <input type="text" name="name" onChange={onInputChange} />
        {!isReady && <span style={{ color: "red" }}>I am not ready yet!</span>}
      </header>
    </div>
  );
}

export default Home;
