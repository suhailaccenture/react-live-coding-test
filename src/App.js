import "./App.css";

import { HashRouter, Route } from "react-router-dom";

import Home from "./Home";
import PokeDex from "./PokeDex";

function App() {
  return (
    <HashRouter>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/pokedex" component={PokeDex}/>
      </div>
    </HashRouter>
  );
}

export default App;
