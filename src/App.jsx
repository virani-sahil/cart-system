import { BrowserRouter, Route, Routes } from "react-router"
import Page from "./components/page"
import Cart from "./components/Cart"
import { useState } from "react"
import { UserContext } from "./components/UserContext";


function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cartitems")) || []);

  return (
    <UserContext.Provider value={{ cart, setCart }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
