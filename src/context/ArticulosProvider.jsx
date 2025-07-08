import React, { createContext, useContext, useState, useCallback } from "react";

const API_URL = "https://686d9ca7c9090c495386c7b7.mockapi.io/api/v1/articulos";

const ArticulosContext = createContext();

export const useArticulos = () => useContext(ArticulosContext);

export const ArticulosProvider = ({ children }) => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticulos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener artículos");
      const data = await res.json();
      setArticulos(data);
    } catch (err) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }, []);

  const getArticulo = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Error al obtener artículo");
      return await res.json();
    } catch (err) {
      setError(err.message || "Error");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addArticulo = useCallback(async (articulo) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articulo),
      });
      if (!res.ok) throw new Error("Error al agregar artículo");
      const nuevo = await res.json();
      setArticulos((prev) => [...prev, nuevo]);
      return nuevo;
    } catch (err) {
      setError(err.message || "Error");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateArticulo = useCallback(async (id, articulo) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articulo),
      });
      if (!res.ok) throw new Error("Error al actualizar artículo");
      const actualizado = await res.json();
      setArticulos((prev) => prev.map((a) => (a.id === id ? actualizado : a)));
      return actualizado;
    } catch (err) {
      setError(err.message || "Error");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteArticulo = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar artículo");
      setArticulos((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (err) {
      setError(err.message || "Error");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ArticulosContext.Provider
      value={{
        articulos,
        loading,
        error,
        fetchArticulos,
        getArticulo,
        addArticulo,
        updateArticulo,
        deleteArticulo,
        setArticulos,
      }}
    >
      {children}
    </ArticulosContext.Provider>
  );
};
