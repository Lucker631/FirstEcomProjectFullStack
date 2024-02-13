import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
//components import
import Home from "./pages/Home";
// import AddCat from "./views/AddCat";
// import Categories from "./views/Categories";
// import AddProd from "./views/AddProd";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/add" element={<AddCat />} />
          <Route path="/display_categories" element={<Categories />} />
          <Route path="/add_product" element={<AddProd />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
