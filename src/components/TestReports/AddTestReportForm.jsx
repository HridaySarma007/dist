import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Snackbar,
  Alert,
  Autocomplete,
  IconButton,
  Collapse,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SaveIcon from "@mui/icons-material/Save";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import api from "../../utils/index";

const AddTestReportForm = () => {
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

  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState(undefined);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //const { isSubmitting } = formState;

  const config = {
    headers: {
      "X-Auth-Token": token,
      "Content-Type": "application/json",
    },
  };

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data, null, 2));
    try {
      const res = await api.post("users", JSON.stringify(data), config);
      if (res.status === 201) {
        //setMessage("User added successfully");
        setStatus({ type: "success", msg: "user added successfully" });
        reset();
        setOpen(true);
      }
      console.log(res);
    } catch (error) {
      if (error.response) {
        //setErrorMessage(error.response.data.error.details);
        setStatus({ type: "error", msg: error.response.data.error.details });
      }
      //console.log(error.response.data.error.details);
    }
  };

  const handleChange = (event) => {
    /* setValues({
      ...values,
      [event.target.name]: event.target.value
    });*/
  };
  const handleReset = () => {
    reset()
  }
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
  ]
  return (
    <>
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
            sx={{ mb: 2 }}
          >
            {status.msg}
          </Alert>
        )}
      </Collapse>
      {status?.type === "error" && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <strong>{status.msg}</strong>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ boxShadow:" 0px 0px 2px 0px #888888;"}}>
          <CardHeader title="Customer & Land details" />

          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4} >
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  defaultValue={top100Films[13]}
                  renderInput={(params) => (
                    <TextField {...params} 
                      name="customer name"
                      {...register("customername")}
                      error={errors.customername ? true : false}
                      helperText={errors.customername?.message} 
                      label="Customer name" placeholder="search customer name" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} >
                <TextField
                  fullWidth
                  label="Land location"
                  name="landLocation"
                  {...register("landLocation")}
                  error={errors.landLocation ? true : false}
                  helperText={errors.landLocation?.message}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} >
                <TextField
                  fullWidth
                  label="Land are size"
                  name="landAreaSize"
                  {...register("landAreaSize")}
                  error={errors.landAreaSize ? true : false}
                  helperText={errors.landAreaSize?.message}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={4} lg={4} >
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  defaultValue={top100Films[13]}
                  renderInput={(params) => (
                    <TextField {...params} 
                      name="state"
                      {...register("state")}
                      error={errors.state ? true : false}
                      helperText={errors.state?.message} 
                      label="State" placeholder="search state" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} >
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  defaultValue={top100Films[13]}
                  renderInput={(params) => (
                    <TextField {...params} 
                      name="district"
                      {...register("district")}
                      error={errors.district ? true : false}
                      helperText={errors.district?.message} 
                      label="District" placeholder="search district" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} >
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  defaultValue={top100Films[13]}
                  renderInput={(params) => (
                    <TextField {...params} 
                      name="subdistrict"
                      {...register("subdistrictct")}
                      error={errors.subdistrict ? true : false}
                      helperText={errors.subdistrict?.message} 
                      label="Subdistrict" placeholder="search subdistrict" />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4} lg={4} >
                <Autocomplete
                  id="size-small-outlined"
                  size="small"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  defaultValue={top100Films[13]}
                  renderInput={(params) => (
                    <TextField {...params} 
                      name="village"
                      {...register("village")}
                      error={errors.village ? true : false}
                      helperText={errors.village?.message} 
                      label="Village" placeholder="search village" />
                  )}
                />
              </Grid>
            </Grid>
            <CardHeader title="Soil sample value" />
            <Divider sx={{ mb: "20px" }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4} >
                <TextField
                  fullWidth
                  label="Nitrogen"
                  name="nitrogen"
                  {...register("nitrogen")}
                  error={errors.nitrogen ? true : false}
                  helperText={errors.nitrogen?.message}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} >
                <TextField
                  fullWidth
                  label="Phosphorus"
                  name="phosphorus"
                  {...register("phosphorus")}
                  error={errors.phosphorus ? true : false}
                  helperText={errors.phosphorus?.message}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} >
                <TextField
                  fullWidth
                  label="Potassium"
                  name="potassium"
                  {...register("potassium")}
                  error={errors.potassium ? true : false}
                  helperText={errors.potassium?.message}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={4} lg={4} >
                <TextField
                  fullWidth
                  label="Ph"
                  name="ph"
                  {...register("ph")}
                  error={errors.ph ? true : false}
                  helperText={errors.ph?.message}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} >
                <TextField
                  fullWidth
                  label="EC"
                  name="ec"
                  {...register("ec")}
                  error={errors.ec ? true : false}
                  helperText={errors.ec?.message}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} >
                <TextField
                  fullWidth
                  label="Temperature"
                  name="temperature"
                  {...register("temperature")}
                  error={errors.temperature ? true : false}
                  helperText={errors.temperature?.message}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button
              sx={{ mr: 2 }}
              onClick={handleReset}
              type="submit"
              color="success"
              variant="contained"
              startIcon={<RotateLeftIcon />}
            >
              Reset
            </Button>
            <Button
              // onClick={handleSubmit(onSubmit)}
              type="submit"
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default AddTestReportForm;
