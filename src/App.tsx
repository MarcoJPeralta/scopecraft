import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wizard from "./pages/Wizard";
import ScopeBuilder from "./pages/ScopeBuilder";
import Preview from "./pages/Preview";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeProvider.tsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/scope-builder" element={<ScopeBuilder />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
