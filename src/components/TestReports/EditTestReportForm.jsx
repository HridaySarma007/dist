import { yupResolver } from "@hookform/resolvers/yup";
import { createTheme } from '@material-ui/core/styles';
import { DateTimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import CloseIcon from "@mui/icons-material/Close";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SaveIcon from "@mui/icons-material/Save";
import {
  Alert, Box,
  Button, CardContent, Collapse, Divider, Card,
  Grid, IconButton, TextField, useMediaQuery,
  useTheme
} from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { fetchCustomerById, fetchReport } from "../../api";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import authHeader from "../../utils/auth-header";
import config from "../../utils/config";
import { formatDateTime } from "../../utils/helpers";
import DisplaySample from "../DisplaySample";
import DisplaySampleInCard from "../DisplaySampleInCard";
import Spinner from "../Spinner/Spinner";

const defaultMaterialTheme = createTheme({
  palette: {
    primary: green,
  },
});

const EditTestReportForm = (props) => {
  const validationSchema = Yup.object().shape({
    customername: Yup.string().required("select customer name"),
    landLocation: Yup.string().required("land location is required"),
    landAreaSize: Yup.string().required("land area size required"),
    state: Yup.string().required("choose state"),
    district: Yup.string().required("choose district"),
    subdistrict: Yup.string().required("choose subdistrict"),
    village: Yup.string().required("choose village"),
    nitrogen: Yup.string().required("nitrogen is required"),
    phosphorus: Yup.string().required("phosphorus is required"),
    potassium: Yup.string().required("potassium is required"),
    ph: Yup.string().required("Ph is required"),
    ec: Yup.string().required("Ec is required"),
    temperature: Yup.string().required("temperature is required"),
  });

  const token = JSON.parse(localStorage.getItem("token"));
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState(undefined);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportDetails, setReportDetails] = useState({});
  const [customer, setCustomer] = useState();
  const [dataUnits, setDataUnits] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [addressData, setAddressData] = useState({
    states: [],
    districts: [],
    subdistricts: [],
    village: [],
    customers: []
  });

  const [selectedOptions, setSelectedOptions] = useState({});

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        config.SOILCARE_API + "customers",
        {
          headers: {
            "X-Auth-Token": token
          }
        }
      );
      let a = addressData;
      a.customers = response.data.data;
      setAddressData(a)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (addressData.customers.length === 0)
      fetchCustomers();
  }, []);

  /* const config = {
       headers: {
           "X-Auth-Token": token,
           "Content-Type": "application/json",
       },
   };*/


  const fetchData = async function() {
    try {
      setLoading(true);
      setIsLoading(true);
      let { data, dataUnits } = await fetchReport({ id: props.id });
      console.log(data)
      // const l = formatDateTime(data.additionalParameters.createdAt)
      // console.log(l)
      // setSelectedDate(l)
      const customer = await fetchCustomerById(data.customerId);
      setReportDetails(data);
      setDataUnits(dataUnits);
      setCustomer(customer);
      setIsLoading(false);
      setLoading(false);
    } catch (error) {
      console.log(error)
      ApiErrorHandler(error, navigate);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    console.log(name)
    setReportDetails({ ...reportDetails, [name]: value });
  };
  function formatToUnixTimestamp(dateStr) {
    //let dateStr = "Fri Apr 20 2020 00:00:00 GMT+0530 (India Standard Time)";
    let l = new Date(dateStr).toISOString();
    let unixTimeStamp = new Date(l).getTime();
    return unixTimeStamp;
  }

  const updateTestReport = async (e) => {
    e.preventDefault();
    let unixTimeStampDate = formatToUnixTimestamp(selectedDate)

    console.log(reportDetails)


    const finalData = {
      refNo: reportDetails.refNo,
      id: reportDetails.id,
      samples: reportDetails.samples,
      location: reportDetails.location.includes(',') ? reportDetails.location.split(",") : reportDetails.location,
      landAreaSize: reportDetails.landAreaSize,
      state: reportDetails.state,
      district: reportDetails.district,
      subdistrict: reportDetails.subdistrict,
      village: reportDetails.village,
      customerId: reportDetails.customerId,
      remarks: reportDetails.remarks ? reportDetails.remarks : reportDetails.additionalParameters.remarks || "",
      additionalParameters: {
        fieldType: reportDetails.fieldType ? reportDetails.fieldType : reportDetails.additionalParameters.fieldType,
        remarks: reportDetails.remarks ? reportDetails.remarks : reportDetails.additionalParameters.remarks,
        testedAt: unixTimeStampDate
      }
    }
    console.log(finalData)
    try {
      const response = await axios.put(config.SOILCARE_API + `/test-results`, finalData, {
        headers: authHeader(),
      });
      if (response.status === 204) {
        setStatus({ type: "success", msg: "Test report updated successfully" });
        setOpen(true);
      }

    } catch (error) {
      console.log(error)
    }

  }

  const handleReset = () => {
    reset()
  }

  if (loading) {
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
    <Card elevation={0} variant='outlined'>
      <CardContent>

        <form onSubmit={updateTestReport}>
          <Grid container spacing={3}>

            <Grid item xs={12} sm={12} md={4} lg={4}>

              <TextField
                fullWidth
                label="Ref No"
                name="refNo"
                size='small'
                defaultValue={reportDetails?.refNo || ""}
                onChange={handleInputChange}
              />

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>

              <TextField
                fullWidth
                label="Customer Name"
                name="fullName"
                size='small'
                value={customer?.fullName || ""}
                InputProps={{
                  readOnly: true,
                }}
              />

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={reportDetails?.state || ""}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                fullWidth
                label="District"
                name="district"
                size='small'
                value={reportDetails?.district || ""}
                onChange={handleInputChange}
                InputProps={{
                  readOnly: true,
                }}
              />

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                fullWidth
                label="Subdistrict"
                name="subdistrict"
                value={reportDetails?.subdistrict || ""}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                fullWidth
                label="Village"
                name="village"
                value={reportDetails?.village || ""}
                onChange={handleInputChange}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                fullWidth
                label="Land area size"
                name="landAreaSize"
                value={reportDetails?.landAreaSize || ""}
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                fullWidth
                label="Land location"
                name="location"
                value={reportDetails?.location || ""}
                onChange={handleInputChange}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              {
                reportDetails?.additionalParameters?.fieldType !== undefined &&
                <TextField
                  fullWidth
                  label="Field Type"
                  name="fieldType"
                  defaultValue={reportDetails?.additionalParameters?.fieldType || ""}
                  onChange={handleInputChange}
                  size="small"
                />
              }

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                fullWidth
                label="Remarks"
                name="remarks"
                size="small"
                defaultValue={reportDetails.remarks ? reportDetails.remarks : reportDetails?.additionalParameters?.remarks || ""}
                onChange={handleInputChange}
              />

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <DateTimePicker
                  label="Tested Date"
                  fullWidth
                  inputVariant="outlined"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  //renderInput={(params) => <TextField {...params} />}
                  size="small"

                />
              </ThemeProvider>
            </Grid>

          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2
              }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
                fullWidth={isMatch}
              >
                Save Changes
              </Button>
            </Box>
            <Collapse in={open}>
              {status?.type === "success" && (
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2, mt: 2 }}
                >
                  {status.msg}
                </Alert>
              )}
            </Collapse>
            {status?.type === "error" && (
              <Alert severity="error" sx={{ my: 3 }}>
                <strong>{status.msg}</strong>
              </Alert>
            )}
          </Grid>
          <br />
        </form>
      </CardContent>
    </Card>
  );
};
export default EditTestReportForm;
