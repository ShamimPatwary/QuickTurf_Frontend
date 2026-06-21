import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BrowseTurfs from "./pages/BrowseTurfs";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <Home navigate={navigate} />;
      case "browse": return <BrowseTurfs navigate={navigate} />;
      case "about": return <About navigate={navigate} />;
      case "contact": return <Contact navigate={navigate} />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}