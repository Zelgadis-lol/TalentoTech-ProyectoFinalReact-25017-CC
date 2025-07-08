import { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import Badge from "@mui/material/Badge";

const AppHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const cartCount = Array.isArray(cartItems)
    ? new Set(cartItems.map((item) => item.id)).size
    : 0;

  const handleLogout = () => {
    logout();
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1e1e2f",
        boxShadow: 2,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 40,
          height: 40,
          px: 2,
          "@media (min-width:600px)": {
            minHeight: 40,
          },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Tienda
        </Typography>

        <Box sx={{ ml: 4, display: "flex", gap: 1 }}>
          {[
            { label: "Home", path: "/home" },
            { label: "Electronica", path: "/electronica" },
            { label: "Joyería", path: "/joyeria" },
            { label: "Ropa Hombre", path: "/ropahombre" },
            { label: "Ropa Mujer", path: "/ropamujer" },
          ].map((section) => {
            const isActive = isActivePath(section.path);
            return (
              <Button
                key={section.label}
                onClick={() => navigate(section.path)}
                sx={{
                  color: isActive ? "#ffca28" : "white",
                  textTransform: "none",
                  fontWeight: isActive ? "bold" : "normal",
                  borderBottom: isActive ? "2px solid #ffca28" : "none",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "#2c2c3a",
                  },
                }}
              >
                {section.label}
              </Button>
            );
          })}

          {isAuthenticated && (
            <Button
              onClick={() => navigate("/admin")}
              sx={{
                color: isActivePath("/admin") ? "#ffca28" : "white",
                fontWeight: isActivePath("/admin") ? "bold" : "normal",
                textTransform: "none",
                border: isActivePath("/admin")
                  ? "2px solid #ffca28"
                  : "1px solid #ffffff55",
                borderRadius: "6px",
                ml: 1,
                px: 2,
                "&:hover": {
                  backgroundColor: "#383850",
                },
              }}
            >
              Administración
            </Button>
          )}
        </Box>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Typography variant="body2" color="inherit">
                {user?.username || "Usuario"}
              </Typography>
              <Button
                onClick={handleLogout}
                sx={{
                  color: "white",
                  borderColor: "white",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                variant="outlined"
                size="small"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: "white",
                borderColor: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
              variant="outlined"
              size="small"
            >
              Login
            </Button>
          )}

          <IconButton
            color="inherit"
            onClick={() => navigate("/carrito")}
            sx={{
              color: isActivePath("/carrito") ? "#ffca28" : "white",
              border: isActivePath("/carrito") ? "2px solid #ffca28" : "none",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#2c2c3a",
              },
            }}
          >
            <Badge badgeContent={cartCount} color="warning" showZero={false}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
