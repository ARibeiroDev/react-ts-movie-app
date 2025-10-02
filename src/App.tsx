import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <>
      <MovieProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MovieProvider>
    </>
  );
}

export default App;
