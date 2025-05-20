import { useCart } from "../context/CartProvider";
import {
  Card,
  Box,
  CssBaseline,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppHeader, Footer } from "../components/Components";

const Carrito = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        mt: 5,
      }}
    >
      <CssBaseline />
      <AppHeader />
      <Card sx={{ width: 800, margin: "0 auto", mt: 4, p: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Carrito
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            El carrito está vacío.
          </Typography>
        ) : (
          cartItems.map((item, index) => (
            <Box key={item.id}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
              >
                <Typography variant="body1">
                  {item.title} — Cantidad: {item.quantity}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              {index < cartItems.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </Card>
      <Footer />
    </Box>
  );
};

export default Carrito;
