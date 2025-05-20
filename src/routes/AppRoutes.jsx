import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import Electronica from "../pages/Electronica";
import Joyeria from "../pages/Joyeria";
import Carrito from "../pages/Carrito";
import Admin from "../pages/Admin";
import { useAuth } from "../context/AuthProvider";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/electronica" element={<Electronica />} />
      <Route path="/joyeria" element={<Joyeria />} />
      <Route
        path="/carrito"
        element={
          isAuthenticated ? <Carrito /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/admin"
        element={isAuthenticated ? <Admin /> : <Navigate to="/home" replace />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
