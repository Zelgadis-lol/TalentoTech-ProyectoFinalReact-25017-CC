import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  CssBaseline,
  Box,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { AppHeader, Footer } from "../components/Components";

const Admin = () => {
  const [articulo, setArticulo] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticulo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(articulo);
    }
    setArticulo({ title: "", description: "", price: "", image: "" });
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
          width: 800,
          margin: "0 auto",
          mt: 4,
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <CardHeader
          title="Agregar Artículo"
          sx={{
            backgroundColor: "#1e1e2f",
            color: "white",
            textAlign: "center",
          }}
        />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={articulo.title}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={articulo.description}
                onChange={handleChange}
                multiline
                rows={3}
              />

              <TextField
                fullWidth
                label="URL de imagen"
                name="image"
                value={articulo.image}
                onChange={handleChange}
              />

              <Grid item xs={6}>
                <TextField
                  label="Precio"
                  name="price"
                  type="number"
                  value={articulo.price}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#1e1e2f", borderRadius: 2, mt: 5 }}
            >
              Agregar
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Footer />
    </Box>
  );
};

export default Admin;
