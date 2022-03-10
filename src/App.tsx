import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Goal } from "./pages/Goal";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goal" element={<Goal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
