import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import { AlertProvider } from "./context/AlertProvider";
import { ArticulosProvider } from "./context/ArticulosProvider";

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <CartProvider>
          <ArticulosProvider>
            <Router>
              <AppRoutes />
            </Router>
          </ArticulosProvider>
        </CartProvider>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
