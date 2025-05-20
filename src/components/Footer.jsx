import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "#2c2c3a",
      color: "white",
      padding: 0.1,
      marginTop: "auto",
    }}
  >
    <Container maxWidth="lg">
      <Typography variant="body1" align="center" sx={{ fontSize: "0.75rem" }}>
        &copy; 2025 Proyecto Final Talento Tech por CC.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
