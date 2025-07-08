import { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { AppHeader, Footer, ProductCard } from "../components/Components";
import { useCart } from "../context/CartProvider";
import { useAlert } from "../context/AlertProvider";

const LOCAL_STORAGE_KEY = "articulos";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useCart();
  const { showToast } = useAlert();

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
      setLoading(false);
    } else {
      fetch("https://fakestoreapi.com/products")
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener productos");
          return res.json();
        })
        .then((data) => {
          setProducts(data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
          setError(false);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(<div>Producto agregado al carrito.</div>, "success");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <CssBaseline />
      <AppHeader />

      <Container maxWidth="100vh" sx={{ flexGrow: 1, py: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Productos
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : error || products.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 5 }}>
            Sin artículos disponibles.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {[...products].reverse().map((product) => (
              <Grid
                key={product.id}
                sx={{ display: "flex", justifyContent: "center", mt: 3 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  cardProps={{
                    sx: {
                      minHeight: 320,
                      display: "flex",
                      flexDirection: "column",
                    },
                  }}
                  descriptionProps={{
                    sx: {
                      minHeight: 48,
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default Home;
