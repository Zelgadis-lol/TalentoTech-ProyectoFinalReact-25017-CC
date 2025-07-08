import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  CssBaseline,
  Box,
  Grid,
  Typography,
  IconButton,
  CardMedia,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState, useCallback } from "react";
import { AppHeader, Footer } from "../components/Components";

const LOCAL_STORAGE_KEY = "articulos";
const PLACEHOLDER_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

const getInitialArticulo = () => ({
  title: "",
  description: "",
  price: "",
  image: "",
  category: "",
});

const validar = (art) => {
  const err = {};
  if (!art.title.trim()) err.title = "El título es obligatorio";
  if (!art.description.trim())
    err.description = "La descripción es obligatoria";
  if (art.description.length < 10)
    err.description = "La descripción debe tener mas de 10 caracteres";
  if (!art.price) err.price = "El precio es obligatorio";
  if (art.price <= 0) err.price = "El precio debe ser mayor a cero";
  if (!art.category) err.category = "La categoría es obligatoria";
  return err;
};

const Admin = () => {
  const [articulos, setArticulos] = useState([]);
  const [articulo, setArticulo] = useState(getInitialArticulo());
  const [editandoId, setEditandoId] = useState(null);
  const [editArticulo, setEditArticulo] = useState(getInitialArticulo());
  const [errores, setErrores] = useState({});
  const [erroresEdit, setErroresEdit] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [confirmarBorrarId, setConfirmarBorrarId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const articulosParsed = JSON.parse(stored);
      setArticulos(articulosParsed);
      const cats = [
        ...new Set(
          articulosParsed
            .map((a) => a.category)
            .filter((c) => typeof c === "string" && c.trim() !== "")
        ),
      ];
      setCategorias(cats);
    } else {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          setArticulos(data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

          const cats = [
            ...new Set(
              data
                .map((a) => a.category)
                .filter((c) => typeof c === "string" && c.trim() !== "")
            ),
          ];
          setCategorias(cats);
        });
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setArticulo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleEditChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditArticulo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = () => {
    setArticulo(getInitialArticulo());
    setErrores({});
  };

  const resetEdit = () => {
    setEditandoId(null);
    setEditArticulo(getInitialArticulo());
    setErroresEdit({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validar(articulo);
    setErrores(err);
    if (Object.keys(err).length > 0) return;
    const maxId =
      articulos.length > 0 ? Math.max(...articulos.map((a) => a.id)) : 0;
    const nuevoArticulo = {
      id: maxId + 1,
      title: articulo.title,
      description: articulo.description,
      price: parseFloat(articulo.price),
      image:
        articulo.image && articulo.image.trim()
          ? articulo.image
          : PLACEHOLDER_IMG,
      category: articulo.category,
    };
    const nuevos = [...articulos, nuevoArticulo];
    setArticulos(nuevos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nuevos));
    resetForm();

    if (articulo.category && !categorias.includes(articulo.category)) {
      setCategorias((prev) => [...prev, articulo.category]);
    }
  };

  const iniciarEdicion = (articulo) => {
    setEditandoId(articulo.id);
    setEditArticulo({
      title: articulo.title,
      description: articulo.description,
      price: articulo.price,
      image: articulo.image,
      category: articulo.category || "",
    });
    setErroresEdit({});
  };

  const guardarEdicion = (id) => {
    const err = validar(editArticulo);
    setErroresEdit(err);
    if (Object.keys(err).length > 0) return;
    const nuevos = articulos.map((a) =>
      a.id === id
        ? {
            ...a,
            title: editArticulo.title,
            description: editArticulo.description,
            price: parseFloat(editArticulo.price),
            image:
              editArticulo.image && editArticulo.image.trim()
                ? editArticulo.image
                : PLACEHOLDER_IMG,
            category: editArticulo.category,
          }
        : a
    );
    setArticulos(nuevos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nuevos));
    resetEdit();

    if (editArticulo.category && !categorias.includes(editArticulo.category)) {
      setCategorias((prev) => [...prev, editArticulo.category]);
    }
  };

  const handleConfirmarBorrar = (id) => {
    setConfirmarBorrarId(id);
  };

  const handleCerrarDialogo = () => {
    setConfirmarBorrarId(null);
  };

  const handleBorrarConfirmado = () => {
    const id = confirmarBorrarId;
    if (!id) return;
    const nuevos = articulos.filter((a) => a.id !== id);
    setArticulos(nuevos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nuevos));
    setConfirmarBorrarId(null);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CssBaseline />
        <AppHeader />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "center",
            width: "100%",
            gap: 4,
            mt: 4,
          }}
        >
          <Card
            sx={{
              width: 300,
              boxShadow: 3,
              borderRadius: 3,
              mb: { xs: 4, md: 0 },
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
                  <Grid item xs={12} sx={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      label="Título"
                      name="title"
                      value={articulo.title}
                      onChange={handleChange}
                      required
                      error={!!errores.title}
                      helperText={errores.title}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      label="Precio"
                      name="price"
                      type="number"
                      value={articulo.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      error={!!errores.price}
                      helperText={errores.price}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      label="Descripción"
                      name="description"
                      value={articulo.description}
                      onChange={handleChange}
                      multiline
                      rows={2}
                      required
                      error={!!errores.description}
                      helperText={errores.description}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%" }}>
                    <TextField
                      select
                      fullWidth
                      required
                      label="Categoría"
                      name="category"
                      value={articulo.category}
                      onChange={handleChange}
                      error={!!errores.category}
                      helperText={errores.category}
                    >
                      {categorias.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sx={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      label="URL de imagen"
                      name="image"
                      value={articulo.image}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#1e1e2f",
                        borderRadius: 2,
                        mt: 2,
                      }}
                    >
                      Agregar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 800,
              boxShadow: 3,
              borderRadius: 3,
            }}
          >
            <CardHeader
              title="Administrar Artículos"
              sx={{
                backgroundColor: "#1e1e2f",
                color: "white",
                textAlign: "center",
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                {[...articulos].reverse().map((a) => (
                  <Grid item key={a.id} sx={{ width: "100%" }}>
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        minHeight: 160,
                        width: "100%",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={a.image || PLACEHOLDER_IMG}
                        alt={a.title}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "contain",
                          mr: 2,
                        }}
                      />
                      {editandoId === a.id ? (
                        <Box sx={{ flex: 1 }}>
                          <TextField
                            fullWidth
                            label="Título"
                            name="title"
                            value={editArticulo.title}
                            onChange={handleEditChange}
                            sx={{ mb: 1 }}
                            required
                            error={!!erroresEdit.title}
                            helperText={erroresEdit.title}
                          />
                          <TextField
                            fullWidth
                            label="Descripción"
                            name="description"
                            value={editArticulo.description}
                            onChange={handleEditChange}
                            multiline
                            rows={2}
                            sx={{ mb: 1 }}
                            required
                            error={!!erroresEdit.description}
                            helperText={erroresEdit.description}
                          />
                          <TextField
                            fullWidth
                            label="Precio"
                            name="price"
                            type="number"
                            value={editArticulo.price}
                            onChange={handleEditChange}
                            sx={{ mb: 1 }}
                            required
                            error={!!erroresEdit.price}
                            helperText={erroresEdit.price}
                          />
                          <FormControl
                            fullWidth
                            required
                            error={!!erroresEdit.category}
                            sx={{ mb: 1 }}
                          >
                            <InputLabel
                              id={`categoria-edit-label-${editandoId}`}
                            >
                              Categoría
                            </InputLabel>
                            <Select
                              labelId={`categoria-edit-label-${editandoId}`}
                              label="Categoría"
                              name="category"
                              value={editArticulo.category}
                              onChange={handleEditChange}
                            >
                              {categorias.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                  {cat}
                                </MenuItem>
                              ))}
                            </Select>
                            {erroresEdit.category && (
                              <Typography variant="caption" color="error">
                                {erroresEdit.category}
                              </Typography>
                            )}
                          </FormControl>
                          <TextField
                            fullWidth
                            label="URL de imagen"
                            name="image"
                            value={editArticulo.image}
                            onChange={handleEditChange}
                            sx={{ mb: 1 }}
                          />
                          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => guardarEdicion(a.id)}
                            >
                              Guardar
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              size="small"
                              onClick={resetEdit}
                            >
                              Cancelar
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {a.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              minHeight: 48,
                              display: "block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {a.description}
                          </Typography>
                          <Typography variant="body1" color="primary">
                            ${a.price}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {a.category}
                          </Typography>
                        </Box>
                      )}
                      {editandoId === a.id ? null : (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 2,
                          }}
                        >
                          <IconButton
                            color="primary"
                            onClick={() => iniciarEdicion(a)}
                            sx={{ mb: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleConfirmarBorrar(a.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Card>
                  </Grid>
                ))}
                {articulos.length === 0 && (
                  <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                      No hay artículos cargados.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Dialog open={!!confirmarBorrarId} onClose={handleCerrarDialogo}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar este artículo? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCerrarDialogo} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleBorrarConfirmado}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Admin;
