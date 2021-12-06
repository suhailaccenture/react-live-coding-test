import "./App.css";

import { useEffect, useState } from "react";

import Modal from "react-modal";
import ReactLoading from "react-loading";
import axios from "axios";

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setPokemonSearch] = useState([]);
  const getPokedexUrl = "https://pokeapi.co/api/v2/pokemon";

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };

  const onItemClick = (pokemon) => {
    setPokemonDetail(pokemon);
  };

  const onPokemonSearch = (event) => {
    const keyword = event.target.value;

    if (keyword !== "") {
      const result = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setPokemonSearch(result);
    } else {
      setPokemonSearch([]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get(getPokedexUrl).then((response) => {
      // Get and sort
      const pokemonData = response.data['results'];
      console.log(pokemonData);
      const sortedData = pokemonData.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()));
      console.log(sortedData);
      setPokemons(sortedData);
      setIsLoading(false);
    });
  }, []);

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>
              when hover on the list item , change the item color to yellow.
            </li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <ReactLoading
                  type={"balls"}
                  color={"#FFFFFF"}
                  height={667}
                  width={375}
                />
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            <input
              className="App-searchBar"
              type="text"
              name="name"
              placeholder="Search Pokemon"
              onKeyUp={onPokemonSearch}
            />
            {searchResult.length === 0
              ? pokemons.map((pokemon) => (
                  <li key={pokemon.name} onClick={() => onItemClick(pokemon)}>
                    <span className="App-listItem">{pokemon.name}</span>
                  </li>
                ))
              : searchResult.map((pokemon) => (
                  <li key={pokemon.name} onClick={() => onItemClick(pokemon)}>
                    <span className="App-listItem">{pokemon.name}</span>
                  </li>
                ))}
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail != null}
          ariaHideApp={false}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <div>
            Requirement:
            <ul>
              <li>show the sprites front_default as the pokemon image</li>
              <li>
                Show the stats details - only stat.name and base_stat is
                required in tabular format
              </li>
              <li>Create a bar chart based on the stats above</li>
              <li>
                Create a buttton to download the information generated in this
                modal as pdf. (images and chart must be included)
              </li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
