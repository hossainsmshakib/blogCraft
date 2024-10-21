import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";

const MainContent: React.FC = () => {
  const location = useLocation();
  const isCreatePostPage = location.pathname === "/create";

  return (
    <main
      className={`flex-grow container mx-auto px-4 py-4 ${
        isCreatePostPage ? "mt-4" : "mt-16 md:mt-20"
      }`}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<ViewPost />} />
      </Routes>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <MainContent />
      </div>
    </Router>
  );
};

export default App;
