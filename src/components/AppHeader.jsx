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
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

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
          ].map((section) => (
            <Button
              key={section.label}
              onClick={() => navigate(section.path)}
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#2c2c3a",
                },
              }}
            >
              {section.label}
            </Button>
          ))}

          {isAuthenticated && (
            <Button
              onClick={() => navigate("/admin")}
              sx={{
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                border: "1px solid #ffffff55",
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
              "&:hover": {
                backgroundColor: "#2c2c3a",
              },
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
