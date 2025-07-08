import {
  Box,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import React from "react";

const Filtros = ({
  precio,
  setPrecio,
  minPrecio,
  maxPrecio,
  categoria,
  setCategoria,
  categorias,
  descripcion,
  setDescripcion,
  onLimpiar,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: { xs: "stretch", md: "center" },
      gap: 2,
      background: "#fff",
      borderRadius: 3,
      p: { xs: 2, md: 1 },
      mb: 1,
      boxShadow: 3,
      justifyContent: "center",
      flexWrap: "wrap",
      minHeight: 80,
      border: "1px solid #ececec",
    }}
  >
    <Box
      sx={{
        minWidth: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        px: 1,
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
        Precio
      </Typography>
      <Slider
        value={precio}
        min={minPrecio}
        max={maxPrecio}
        onChange={(_, v) => setPrecio(v)}
        valueLabelDisplay="auto"
        step={1}
        marks={false}
        sx={{
          width: "100%",
          color: "#1e1e2f",
          "& .MuiSlider-thumb": {
            borderRadius: 2,
            backgroundColor: "#ffca28",
            border: "2px solid #1e1e2f",
          },
          "& .MuiSlider-track": {
            border: "none",
          },
          "& .MuiSlider-rail": {
            opacity: 0.5,
            backgroundColor: "#bdbdbd",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          mt: -1,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          ${minPrecio}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ${maxPrecio}
        </Typography>
      </Box>
    </Box>
    <FormControl
      sx={{
        minWidth: 150,
        mx: 1,
        background: "#fafafa",
        borderRadius: 2,
        boxShadow: 1,
      }}
      size="small"
      variant="outlined"
    >
      <InputLabel id="categoria-label">Categoría</InputLabel>
      <Select
        labelId="categoria-label"
        label="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        sx={{
          borderRadius: 2,
          background: "#fafafa",
        }}
      >
        <MenuItem value="">
          <em>Todas</em>
        </MenuItem>
        {categorias.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label="Buscar descripción"
      value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
      size="small"
      variant="outlined"
      sx={{
        minWidth: 180,
        mx: 1,
        background: "#fafafa",
        borderRadius: 2,
        boxShadow: 1,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
      InputProps={{
        style: { height: 40, padding: 0 },
      }}
    />
    <Button
      variant="contained"
      color="warning"
      onClick={onLimpiar}
      sx={{
        height: 40,
        alignSelf: "center",
        minWidth: 120,
        px: 2,
        borderRadius: 2,
        boxShadow: 1,
        fontWeight: "bold",
        color: "#1e1e2f",
        background: "#ffca28",
        "&:hover": {
          background: "#ffd54f",
        },
      }}
    >
      Limpiar filtros
    </Button>
  </Box>
);

export default Filtros;
