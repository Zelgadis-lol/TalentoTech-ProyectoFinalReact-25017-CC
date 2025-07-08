import React from "react";
import { Pagination, Stack } from "@mui/material";

const Paginado = ({ total, page, onChange, pageSize = 10 }) => {
  const pageCount = Math.ceil(total / pageSize);

  if (pageCount <= 1) return null;

  return (
    <Stack spacing={2} alignItems="center" sx={{ my: 3 }}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default Paginado;
