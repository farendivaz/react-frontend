import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
