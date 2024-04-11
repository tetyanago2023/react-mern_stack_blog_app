import './App.css';
import Header from "./components/header";
import Home from "./pages/home";
import {Route, Routes} from "react-router-dom";
import AddNewBlog from "./pages/add-blog";

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/add-blog" element={<AddNewBlog />} />
        </Routes>
    </div>
  );
}

export default App;
