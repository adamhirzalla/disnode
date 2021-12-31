import "./App.css";
import ConfirmationModal from "./Modal/ConfirmationModal";
import ServerBar from "./Navbar/ServerBar";

function App() {
  return (
    <div className="App">
      <ServerBar />
      <ConfirmationModal />
    </div>
  );
}

export default App;
