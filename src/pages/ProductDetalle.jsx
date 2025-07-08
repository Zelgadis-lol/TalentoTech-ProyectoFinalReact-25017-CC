import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import { AppHeader, Footer } from "../components/Components";
import { useCart } from "../context/CartProvider";
import { useAlert } from "../context/AlertProvider";
import { useArticulos } from "../context/ArticulosProvider";

const ProductDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getArticulo, loading } = useArticulos();
  const [articulo, setArticulo] = useState(null);

  const { addToCart } = useCart();
  const { showToast } = useAlert();

  useEffect(() => {
    getArticulo(id).then(setArticulo);
  }, [id, getArticulo]);

  const handleAddToCart = () => {
    addToCart(articulo);
    showToast(<div>Producto agregado al carrito.</div>, "success");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <CssBaseline />
      <AppHeader />

      <Container maxWidth="md" sx={{ flexGrow: 1, py: 4, mt: 5 }}>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          ← Volver
        </Button>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : !articulo ? (
          <Typography variant="h6" align="center" sx={{ mt: 5 }}>
            No se encontró el producto.
          </Typography>
        ) : (
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={articulo.image}
              alt={articulo.title}
              sx={{ maxWidth: 400, maxHeight: 400, objectFit: "contain" }}
            />
            <Typography variant="h5" gutterBottom>
              {articulo.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {articulo.description}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ${articulo.price?.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </Button>
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default ProductDetalle;
