// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/styles/App.css";
import Header from "./components/Header";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListProvider } from "./providers/ListProvider";
import { BasketProvider } from "./providers/BasketProvider";

function App() {
  return (
    <BasketProvider>
      <ListProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
          </div>
        </Router>
      </ListProvider>
    </BasketProvider>
  );
}

export default App;
