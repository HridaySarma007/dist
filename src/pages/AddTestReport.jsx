import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AddTestReportForm from "../components/TestReports/AddTestReportForm";
import { Add } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  /*page: {
		background: '#f4f6f8',
		width: '100%',
		height: '100%'
		//padding: '20px',
	},*/
  d: {
    padding: theme.spacing(3),
  },
}));

function AddTestReport() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.page}>
        <Navbar />

        <Container
          maxWidth={false}
          sx={{ width: "90%", minHeight: "100%", py: 12, mt: 4, mb: 4 }}
        >
          <Grid container spacing={3} style={{ justifyContent: "center" }}>
            <Grid item lg={8} md={12} xs={12}>
              <AddTestReportForm />
            </Grid>
          </Grid>
        </Container>
        {/*<Footer /> */}
      </div>
    </>
  );
}

export default AddTestReport;
