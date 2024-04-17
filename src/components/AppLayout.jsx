import Grid from "@mui/material/Grid";
import NavBar from "./NavBar/NavBar";

import { Outlet, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

function AppLayout() {
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(
    function () {
      const parsedTitle = location.pathname.replace(/\W/g, " ");
      setTitle(parsedTitle);
    },
    [location]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} component={"aside"}>
        <NavBar />
      </Grid>
      <Grid
        container
        item
        xs={8}
        component={"div"}
        direction="column"
        justifyContent="space-between"
      >
        <header>
          <Typography
            sx={{ textTransform: "capitalize", textAlign: "center" }}
            variant="h1"
          >
            {title}
          </Typography>
        </header>
        <main>
          <Outlet />
        </main>
      </Grid>
    </Grid>
  );
}

export default AppLayout;
