import { useEffect, useState } from "react";
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
import Paginado from "../components/Paginado";
import { useCart } from "../context/CartProvider";
import { useAlert } from "../context/AlertProvider";
import { Helmet } from "react-helmet";

const LOCAL_STORAGE_KEY = "articulos";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [precio, setPrecio] = useState([0, 1000]);
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const pageSize = 10;

  const { addToCart } = useCart();
  const { showToast } = useAlert();

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const prods = JSON.parse(stored);
      setProducts(prods);

      setCategorias([
        ...new Set(
          prods
            .map((a) => a.category)
            .filter((c) => typeof c === "string" && c.trim() !== "")
        ),
      ]);
      setLoading(false);
    } else {
      fetch("https://fakestoreapi.com/products")
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener productos");
          return res.json();
        })
        .then((data) => {
          setProducts(data);
          setCategorias([
            ...new Set(
              data
                .map((a) => a.category)
                .filter((c) => typeof c === "string" && c.trim() !== "")
            ),
          ]);
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

  const precios = products.map((p) => Number(p.price) || 0);
  const minPrecio = precios.length ? Math.min(...precios) : 0;
  const maxPrecio = precios.length ? Math.max(...precios) : 1000;

  useEffect(() => {
    setPrecio([minPrecio, maxPrecio]);
  }, [minPrecio, maxPrecio]);

  // Resetear página al cambiar filtros
  useEffect(() => {
    setPagina(1);
  }, [categoria, descripcion, precio[0], precio[1]]);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(<div>Producto agregado al carrito.</div>, "success");
  };

  const productosFiltrados = products.filter(
    (p) =>
      (!categoria || p.category === categoria) &&
      (!descripcion ||
        p.description.toLowerCase().includes(descripcion.toLowerCase()) ||
        p.title.toLowerCase().includes(descripcion.toLowerCase())) &&
      Number(p.price) >= precio[0] &&
      Number(p.price) <= precio[1]
  );

  const productosPagina = [...productosFiltrados]
    .reverse()
    .slice((pagina - 1) * pageSize, pagina * pageSize);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Helmet>
        <title>Tienda Online - Productos</title>
        <meta
          name="description"
          content="Explora y compra productos de electrónica, joyería, ropa y más en nuestra tienda online."
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
          categoria={categoria}
          setCategoria={setCategoria}
          categorias={categorias}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          onLimpiar={() => {
            setCategoria("");
            setDescripcion("");
            setPrecio([minPrecio, maxPrecio]);
          }}
        />
        <Paginado
          total={productosFiltrados.length}
          page={pagina}
          onChange={setPagina}
          pageSize={pageSize}
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
            productosPagina.map((product) => (
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

export default Home;
