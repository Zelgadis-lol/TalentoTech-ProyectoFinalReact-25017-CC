import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import Badge from "@mui/material/Badge";

const menuSections = [
  { label: "Home", path: "/home" },
  { label: "Electronica", path: "/electronica" },
  { label: "Joyería", path: "/joyeria" },
  { label: "Ropa Hombre", path: "/ropahombre" },
  { label: "Ropa Mujer", path: "/ropamujer" },
];

const AppHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const cartCount = Array.isArray(cartItems)
    ? new Set(cartItems.map((item) => item.id)).size
    : 0;

  const [drawerOpen, setDrawerOpen] = useState(false);

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
      aria-label="Barra de navegación principal"
    >
      <Toolbar
        sx={{
          minHeight: 40,
          height: 40,
          px: 2,
          "@media (min-width:600px)": {
            minHeight: 40,
            height: 40,
          },
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            cursor: "pointer",
            lineHeight: "40px",
            height: 40,
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => navigate("/home")}
          aria-label="Ir a la página principal"
        >
          Tienda
        </Typography>

        <Box
          sx={{
            ml: 4,
            display: { xs: "none", md: "flex" },
            gap: 1,
            height: 40,
            alignItems: "center",
            flexWrap: "wrap",
            overflow: "hidden",
          }}
          component="nav"
          aria-label="Navegación de secciones"
        >
          {menuSections.map((section) => {
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
                  height: 36,
                  minHeight: 36,
                  lineHeight: "36px",
                  padding: "0 12px",
                  alignItems: "center",
                  display: "flex",
                  "&:hover": {
                    backgroundColor: "#2c2c3a",
                  },
                }}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Ir a ${section.label}`}
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
                height: 36,
                minHeight: 36,
                lineHeight: "36px",
                alignItems: "center",
                display: "flex",
                "&:hover": {
                  backgroundColor: "#383850",
                },
              }}
            >
              Administración
            </Button>
          )}
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" }, ml: 2 }}>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{
              p: 0.5,
              height: 36,
              width: 36,
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Abrir menú de navegación"
          >
            <MenuIcon />
          </IconButton>
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
            aria-label="Ir al carrito"
          >
            <Badge badgeContent={cartCount} color="warning" showZero={false}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 220, background: "#23233a", color: "white" },
        }}
      >
        <Box sx={{ mt: 2 }}>
          <List>
            {menuSections.map((section) => (
              <ListItem key={section.label} disablePadding>
                <ListItemButton
                  selected={isActivePath(section.path)}
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate(section.path);
                  }}
                  sx={{
                    color: isActivePath(section.path) ? "#ffca28" : "white",
                    fontWeight: isActivePath(section.path) ? "bold" : "normal",
                  }}
                >
                  <ListItemText primary={section.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {isAuthenticated && (
              <ListItem disablePadding>
                <ListItemButton
                  selected={isActivePath("/admin")}
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate("/admin");
                  }}
                  sx={{
                    color: isActivePath("/admin") ? "#ffca28" : "white",
                    fontWeight: isActivePath("/admin") ? "bold" : "normal",
                  }}
                >
                  <ListItemText primary="Administración" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default AppHeader;
