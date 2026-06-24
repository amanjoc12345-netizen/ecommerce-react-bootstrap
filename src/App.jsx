import React, { Suspense } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";

import {
  Routes,
  Route,
} from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <>
      <Header />

      <Suspense fallback={<div className="text-center mt-5 py-5 text-muted">Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/store"
            element={<Products />}
          />

          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;