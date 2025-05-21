import { useCart } from "../context/CartProvider";
import {
  Card,
  Box,
  CssBaseline,
  Typography,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AppHeader, Footer } from "../components/Components";

const Carrito = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, value) => {
    const qty = Number(value);
    if (!isNaN(qty) && qty > 0) {
      updateQuantity(id, qty);
    }
  };

  const increment = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  const decrement = (id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    }
  };

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

      <Card
        sx={{
          width: { xs: "95%", md: 800 },
          margin: "0 auto",
          mt: 4,
          p: 3,
          boxShadow: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Carrito de compras
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            El carrito está vacío.
          </Typography>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <Box key={item.id} mb={index < cartItems.length - 1 ? 3 : 0}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: 120,
                      height: 100,
                      objectFit: "contain",
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                  />

                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      noWrap
                      title={item.title}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      Precio unitario: ${item.price.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      minWidth: 140,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => decrement(item.id, item.quantity)}
                      aria-label={`Disminuir cantidad de ${item.title}`}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <TextField
                      type="number"
                      size="small"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      inputProps={{
                        min: 1,
                        style: { textAlign: "center", width: 50 },
                      }}
                    />

                    <IconButton
                      size="small"
                      onClick={() => increment(item.id, item.quantity)}
                      aria-label={`Incrementar cantidad de ${item.title}`}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 1,
                      minWidth: 100,
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      size="small"
                      aria-label={`Eliminar ${item.title}`}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                {index < cartItems.length - 1 && (
                  <Divider sx={{ mt: 2, mb: 2 }} />
                )}
              </Box>
            ))}

            <Divider sx={{ mt: 3, mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pr: 1,
                pb: 1,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Total: ${total.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </Card>

      <Footer />
    </Box>
  );
};

export default Carrito;
