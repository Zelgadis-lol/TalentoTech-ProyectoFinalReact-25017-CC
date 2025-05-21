import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Credenciales incorrectas",
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, textAlign: "center" }}
      >
        <Box alt="Bienvenida" sx={{ width: 200, mt: 3, mb: 5 }} />
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Usuario"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Ingresar
          </Button>
        </form>
        <Button
          variant="outlined"
          onClick={() => navigate("/home")}
          sx={{
            textTransform: "none",
            mt: 2,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          ← Ir a Home
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
