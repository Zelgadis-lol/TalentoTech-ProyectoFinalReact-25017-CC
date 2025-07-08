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

const LOCAL_STORAGE_KEY = "articulos";

const ProductDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useCart();
  const { showToast } = useAlert();

  useEffect(() => {
    setLoading(true);
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    setTimeout(() => {
      if (stored) {
        const articulos = JSON.parse(stored);
        const encontrado = articulos.find((a) => String(a.id) === String(id));
        setProduct(encontrado || null);
      } else {
        setProduct(null);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
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
        ) : error || !product ? (
          <Typography variant="h6" align="center" sx={{ mt: 5 }}>
            Producto no encontrado.
          </Typography>
        ) : (
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{ maxWidth: 400, maxHeight: 400, objectFit: "contain" }}
            />
            <Typography variant="h5" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
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
