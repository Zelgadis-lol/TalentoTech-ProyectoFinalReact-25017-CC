import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import Electronica from "../pages/Electronica";
import Joyeria from "../pages/Joyeria";
import Carrito from "../pages/Carrito";
import RopaHombre from "../pages/RopaHombre";
import RopaMujer from "../pages/RopaMujer";
import Admin from "../pages/Admin";
import ProductDetalle from "../pages/ProductDetalle";
import { useAuth } from "../context/AuthProvider";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/electronica" element={<Electronica />} />
      <Route path="/joyeria" element={<Joyeria />} />
      <Route path="/ropahombre" element={<RopaHombre />} />
      <Route path="/ropamujer" element={<RopaMujer />} />
      <Route path="/producto/:id" element={<ProductDetalle />} />
      <Route path="/carrito" element={<Carrito />} />

      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            <Admin />
          ) : (
            <Navigate to="/login" replace state={{ from: location }} />
          )
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
