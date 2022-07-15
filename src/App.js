import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/Main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
