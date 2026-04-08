import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Toaster richColors theme="system" />
    </>
  );
}

export default App;
