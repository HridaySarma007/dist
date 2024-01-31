import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../utils/index";
import config from "../../utils/config";
import axios from "axios";
import authHeader from "../../utils/auth-header";
import DisplaySample from "../DisplaySample";
import { fetchNR, fetchCustomerById } from "../../api";
import Spinner from "../Spinner/Spinner";
import DisplaySampleInCard from "../DisplaySampleInCard";
import ApiErrorHandler from "../../utils/ApiErrorHandler";

const RecommendationReport = (props) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { id, corp, target, method } = props;
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState({});
  const [nutrientRequirement, setNutrientRequirement] = useState({});
  const [targets, setTargets] = useState({});
  const [testResults, setTestResults] = useState([]);
  const [dataUnits, setDataUnits] = useState({});
  const navigate = useNavigate();

  function reOrder(sample) {
    return {
      ph: sample.ph,
      ec: sample.ec,
      organicCarbon: sample.organicCarbon,
      nitrogen: sample.nitrogen,
      phosphorus: sample.phosphorus,
      potassium: sample.potassium,
      sulphur: sample.sulphur,
      zinc: sample.zinc,
      boron: sample.boron,
      iron: sample.iron,
      manganese: sample.manganese,
      copper: sample.copper,
      temperature: sample.temperature,
      moisture: sample.moisture
    };
  }
  const mapObject = (object, callback) => {
    for (let key in object) {
      object[key] = callback(object[key]);
    }
    return object;
  };

  const fetchData = async function () {
    try {
      setIsLoading(true);
      let { targets, nutrientRequirements, testResult, dataUnits } =
        await fetchNR({ id: id, corp: corp, target: target, method: method });

      testResult.samples[0] = reOrder(testResult.samples[0]);

      const customer = await fetchCustomerById(testResult.customerId);
      setNutrientRequirement(nutrientRequirements);
      setTargets(targets);
      nutrientRequirements = mapObject(nutrientRequirements, (s) =>
        s < 0 ? 0 : s
      );
      setTestResults(testResult);
      setDataUnits(dataUnits);
      setCustomer(customer);
      setIsLoading(false);
    } catch (error) {
      ApiErrorHandler(error, navigate);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DownloadNutrientReport = async () => {
    setLoading(true);
    const data = {
      nutrientRequirements: nutrientRequirement,
      targets: targets,
      customer: customer,
      testResult: testResults,
      dataUnits: dataUnits,
    };
    const res = await fetch(config.PDF_SERVER + "/nr", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    const pdfUrl = URL.createObjectURL(await res.blob(), {
      download: "abcd.pdf",
    });
    setLoading(false);
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = testResults.refNo + ".pdf";
    document.body.appendChild(a);
    a.click();
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <LoadingButton
              sx={{ marginRight: "5px", mb: 1 }}
              startIcon={<Download />}
              color="primary"
              variant="contained"
              onClick={DownloadNutrientReport}
              loading={loading}
            >
              Download NR
            </LoadingButton>
          </div>
        </Grid>
      </Grid>

      <Card sx={{ boxShadow: " 0px 0px 2px 0px #888888;" }}>
        <CardHeader
          title="Nutrient Requirements"
          sx={{ textAlign: "center" }}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <span>Nitrogen:{nutrientRequirement.nitrogen} {dataUnits.nitrogen || ""} </span>

                <span>Phosphorus: {nutrientRequirement.phosphorus} {dataUnits.phosphorus || ""} </span>

                <span>Potassium: {nutrientRequirement.potassium} {dataUnits.potassium || ""}</span>

              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ marginTop: "1em", boxShadow: " 0px 0px 2px 0px #888888;" }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", }}>

                <span>Crop:{targets.corp} </span>
                <span>Method:{targets.method}</span>
                <span>Target Yield: {targets.target + " " + "Quintal"} </span>

              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {isMatch ? (
        <Card sx={{ mt: 1 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={8}>
                {testResults.samples !== undefined &&
                  DisplaySampleInCard({
                    data: testResults.samples[0],
                    dataUnits: dataUnits,
                  })}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <div style={{ marginTop: "15px" }}>
          {testResults.samples !== undefined &&
            DisplaySample({
              data: testResults.samples[0],
              dataUnits: dataUnits,
            })}
        </div>
      )}

      <br />
      {/*testResults.additionalParameters !== undefined && (
        <Card sx={{ marginTop: "1em", boxShadow: " 0px 0px 2px 0px #888888;" }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={8}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <strong>Field Type: </strong>
                  {testResults.additionalParameters?.fieldType}

                  <strong>Tested on: </strong>
                  {testResults.additionalParameters?.testedAt}

                  <strong>Remarks: </strong>
                  {nutrientRequirement.remarks}
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
                ) */}

      {/* <TableContainer>
        <Table border="0" width="100%" sx={{ borderCollapse: "collapse" }}>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>Farmer Details</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Table
                border="1"
                width="100%"
                sx={{ borderCollapse: "collapse" }}
              >
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Syed Injamul Haque</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mobile</TableCell>
                  <TableCell>8822677188</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>example@email.com</TableCell>
                </TableRow>
              </Table>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>
              <strong>SOIL SAMPLE DETAILS</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Table
                border="1"
                width="100%"
                sx={{ borderCollapse: "collapse" }}
              >
                <TableRow>
                  <TableCell>
                    <strong>Sample collection date</strong>
                  </TableCell>
                  <TableCell>12-12-2021</TableCell>
                  <TableCell>
                    <strong>LatLng</strong>
                  </TableCell>
                  <TableCell>55344334,6635533</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Land Area</strong>
                  </TableCell>
                  <TableCell>2ha</TableCell>
                  <TableCell>
                    <strong>Field Type</strong>
                  </TableCell>
                  <TableCell>Green House</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Land Address</strong>
                  </TableCell>
                  <TableCell colSpan="3">
                    Chandmari, Guwahati, Kamrup (M), Assam
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Remarks</strong>
                  </TableCell>
                  <TableCell colSpan="3">This is test remarks</TableCell>
                </TableRow>
              </Table>
              <Table >
                   
              </Table>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>*/}
    </>
  );
};

export default RecommendationReport;
