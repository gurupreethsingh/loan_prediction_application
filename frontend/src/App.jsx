import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/auth_components/AuthManager";
import MainLayout from "./components/common_components/MainLayout";
import "./styles/globals.css";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
