import { Routes, BrowserRouter, Route } from "react-router";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Home from "./pages/home/Home";
import DetailesHotel from "./components/detailHotel/DetailesHotel";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/test" element={<Hotel />} />
          <Route path="/hotels/:id" element={<DetailesHotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
