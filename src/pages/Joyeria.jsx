import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import {
  AppHeader,
  Footer,
  ProductCard,
  Filtros,
} from "../components/Components";
import { useCart } from "../context/CartProvider";
import { useAlert } from "../context/AlertProvider";
import { Helmet } from "react-helmet";
import { useArticulos } from "../context/ArticulosProvider";

const Joyeria = () => {
  const [precio, setPrecio] = useState([0, 1000]);
  const [descripcion, setDescripcion] = useState("");

  const { addToCart } = useCart();
  const { showToast } = useAlert();
  const { articulos, loading, error, fetchArticulos } = useArticulos();

  useEffect(() => {
    fetchArticulos();
  }, [fetchArticulos]);

  const joyeria = articulos.filter((a) => a.category === "Joyería");

  const precios = joyeria.map((p) => Number(p.price) || 0);
  const minPrecio = precios.length ? Math.min(...precios) : 0;
  const maxPrecio = precios.length ? Math.max(...precios) : 1000;

  useEffect(() => {
    setPrecio([minPrecio, maxPrecio]);
  }, [minPrecio, maxPrecio]);

  const productosFiltrados = joyeria.filter(
    (p) =>
      (!descripcion ||
        p.description.toLowerCase().includes(descripcion.toLowerCase()) ||
        p.title.toLowerCase().includes(descripcion.toLowerCase())) &&
      Number(p.price) >= precio[0] &&
      Number(p.price) <= precio[1]
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(<div>Producto agregado al carrito.</div>, "success");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Helmet>
        <title>Joyería - Tienda Online</title>
        <meta
          name="description"
          content="Productos de joyería en la tienda online. Filtra por precio y descripción."
        />
      </Helmet>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth="100vh" sx={{ flexGrow: 1, py: 4, mt: 2 }}>
        <Filtros
          precio={precio}
          setPrecio={setPrecio}
          minPrecio={minPrecio}
          maxPrecio={maxPrecio}
          categoria={"Joyería"}
          setCategoria={() => {}}
          categorias={["Joyería"]}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          onLimpiar={() => {
            setDescripcion("");
            setPrecio([minPrecio, maxPrecio]);
          }}
        />
        <Grid container spacing={3} justifyContent="center">
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress aria-label="Cargando productos" />
            </Box>
          ) : error || productosFiltrados.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 5 }}>
              Sin artículos disponibles.
            </Typography>
          ) : (
            productosFiltrados.reverse().map((product) => (
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
                    "aria-label": `Producto: ${product.title}`,
                  }}
                  descriptionProps={{
                    sx: {
                      minHeight: 48,
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                  addToCartButtonProps={{
                    "aria-label": `Agregar ${product.title} al carrito`,
                  }}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Joyeria;
