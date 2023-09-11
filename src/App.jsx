import "./App.css";
import { Navbar, Toast } from "./components";
import { useTheme } from "./context";
import { Routes, Route } from "react-router-dom";
import { Home, Archive, NotFound, Layout, Bin } from "./pages";

const App = () => {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <Toast />
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/bin" element={<Bin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
