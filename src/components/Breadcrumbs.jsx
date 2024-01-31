import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

export default function ({ items }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ pb: 4 }}>
      {items.map((item, idx) => (
        <>
          {idx < items.length - 1 ? (
            <Link
              to={`/${item.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item}
            </Link>
          ) : (
            <Typography color="primary">{item}</Typography>
          )}
        </>
      ))}
    </Breadcrumbs>
  );
}
