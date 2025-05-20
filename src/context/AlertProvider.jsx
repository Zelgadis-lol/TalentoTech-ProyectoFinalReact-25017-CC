import React, { createContext, useContext, useCallback } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

const AlertManager = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showToast = useCallback(
    (message, variant = "info", options = {}) => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 3000,
        action: (key) => (
          <IconButton
            onClick={() => closeSnackbar(key)}
            color="inherit"
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        ),
        ...options,
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );

  return (
    <AlertContext.Provider value={{ showToast }}>
      {children}
    </AlertContext.Provider>
  );
};

export const AlertProvider = ({ children }) => (
  <SnackbarProvider
    maxSnack={5}
    //preventDuplicate
    autoHideDuration={3000}
  >
    <AlertManager>{children}</AlertManager>
  </SnackbarProvider>
);
