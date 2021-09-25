import { useState, useEffect } from "react";
import "./App.css";
import { HelpPanel, PursuitView } from "./components";
import { NavBar } from "./components/NavBar";
import { searchBoatClasses, calculatePursuitResults } from "./services";

const KEY_EVENT = "keydown";
const openKeys = ["ctrl", "o"];
const closeKeys = ["esc"];
function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener(KEY_EVENT, handleKeyDown);
    return () => {
      window.removeEventListener(KEY_EVENT, handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "o" && event.ctrlKey) {
      setIsOpen(true);
    }
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <HelpPanel isOpen={isOpen} openKeys={openKeys} closeKeys={closeKeys}>
          <PursuitView
            isOpen={isOpen}
            searchBoatClasses={searchBoatClasses}
            calculateResults={calculatePursuitResults}
          />
        </HelpPanel>
      </header>
    </div>
  );
}

export default App;
