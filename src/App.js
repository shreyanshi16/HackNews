import "./App.css";

import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import AddEditBlog from "./pages/AddEditNews";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addNews" element={<AddEditBlog />} />
          <Route path="/editNews/:id" element={<AddEditBlog />} />
          <Route path="/news/:id" element={<News />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
