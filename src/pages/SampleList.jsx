import { Delete, Edit, KeyboardArrowLeft, KeyboardArrowRight, Visibility } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Container,
  Divider,
  IconButton, InputBase, Paper,
  Stack, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Tooltip, Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiErrorHandler from "../utils/ApiErrorHandler";
import authHeader from "../utils/auth-header";
import { formatDateTime } from "../utils/helpers";
import api from "../utils/index";
import DropDown from "../components/dropdown";
import NoData from "../components/Spinner/NoData";
import Spinner from "../components/Spinner/Spinner";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, TextField } from "@mui/material";
import validator from "validator"
import _ from "lodash"
import axios from "axios"
import config from "../utils/config";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const EditDialog = ({ item, open, setOpen, loadReports }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [errors, setErrors] = useState({});
  const [location, setLoaction] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = Object.fromEntries((new FormData(e.target)).entries());
    const vError = {};

    if (validator.isEmpty(values.grower_name)) {
      vError.grower_name = "Grower name required"
    }

    if (validator.isEmpty(values.phone)) {
      vError.phone = "Phone required"
    }

    if (validator.isEmpty(values.reg_no)) {
      vError.reg_no = "Registration number required"
    }
    if (validator.isEmpty(values.grower_address)) {
      vError.grower_address = "Grower address required"
    }
    if (validator.isEmpty(values.district)) {
      vError.district = "District required"
    }
    if (validator.isEmpty(values.village)) {
      vError.village = "Village required"
    }
    if (validator.isEmpty(values.subdistrict)) {
      vError.subdistrict = "Subdistrict required"
    }
    if (validator.isEmpty(values.state)) {
      vError.state = "State required"
    }
    if (validator.isEmpty(values.section_no)) {
      vError.section_no = "Section No. required"
    }
    if (!validator.isEmpty(values.section_no) && !validator.isNumeric(values.section_no)) {
      vError.section_no = "Section No. must be a number"
    }
    if (validator.isEmpty(values.area)) {
      vError.area = "Land area required"
    }
    if (validator.isEmpty(values.age)) {
      vError.age = "Plant age required"
    }
    if (!validator.isNumeric(values.age)) {
      vError.age = "Plant age must be a number"
    }

    if (!validator.isEmpty(values.target) && !validator.isNumeric(values.target)) {
      vError.target = "Target must be a number"
    }

    if (Object.entries(vError).length > 0) {
      setErrors(vError);
      return;
    }

    const data = _.omit(values, ['village', 'subdistrict', 'district', 'state']);
    data.sample_address = {
      village: values.village,
      subdistrict: values.subdistrict,
      district: values.district,
      state: values.state
    }
    data.location = location
    data.target = values.target || 15;
    try {
      await axios.put(`${config.SOILCARE_API}/samples/${item.id}`, data);
      setOpen(false)
      alert("Sample Data updated sucessfully");
      loadReports();
    } catch (err) {
      console.log(err)
      alert("Ubable to update sample data");
    }

  }
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit}>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Edit Sample Details
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Grower Name*"
                  name="grower_name"
                  variant="filled"
                  size="small"
                  defaultValue={item?.grower?.name || ""}
                  error={errors?.grower_name?.length > 0}
                  helperText={errors?.grower_name}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Phone*"
                  name="phone"
                  variant="filled"
                  size="small"
                  defaultValue={item?.grower?.phone || ""}
                  error={errors?.phone?.length > 0}
                  helperText={errors?.phone}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Grower Address*"
                  name="grower_address"
                  variant="filled"
                  size="small"
                  defaultValue={item?.grower?.address || ""}
                  error={errors?.grower_address?.length > 0}
                  helperText={errors?.grower_address}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Grower Registration number*"
                  name="reg_no"
                  variant="filled"
                  size="small"
                  defaultValue={item?.grower?.reg_no || ""}
                  error={errors?.reg_no?.length > 0}
                  helperText={errors?.reg_no}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Section No.*"
                  name="section_no"
                  variant="filled"
                  size="small"
                  defaultValue={item?.sample?.section_no || ""}
                  error={errors?.section_no?.length > 0}
                  helperText={errors?.section_no}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Land Area Size*"
                  name="area"
                  variant="filled"
                  size="small"
                  defaultValue={item?.sample?.landAreaSize || ""}
                  error={errors?.area?.length > 0}
                  helperText={errors?.area}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Plant Age*"
                  name="age"
                  variant="filled"
                  size="small"
                  defaultValue={item?.sample?.age || ""}
                  error={errors?.age?.length > 0}
                  helperText={errors?.are}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Target Yield/Yield of preceding cycle"
                  name="target"
                  variant="filled"
                  size="small"
                  defaultValue={item?.sample?.target || ""}
                  error={errors?.target?.length > 0}
                  helperText={errors?.target}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Village*"
                  name="village"
                  variant="filled"
                  size="small"
                  defaultValue={item?.sample?.village || ""}
                  error={errors?.village?.length > 0}
                  helperText={errors?.village}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="Subdistrict*"
                  name="subdistrict"
                  variant="filled"
                  size="small"
                  defaultValue={item?.sample?.subdistrict || ""}
                  error={errors?.subdistrict?.length > 0}
                  helperText={errors?.subdistrict}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="District*"
                  name="district"
                  variant="filled"
                  size="small"
                  defaultValue={item?.sample?.district || ""}
                  error={errors?.district?.length > 0}
                  helperText={errors?.district}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  label="State*"
                  name="state"
                  variant="filled"
                  size="small"
                  defaultValue={item?.sample?.state || ""}
                  error={errors?.state?.length > 0}
                  helperText={errors?.state}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save changes
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}


const TeaReports = () => {

  const [searchBy, setSearchBy] = useState("ref-no");
  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = useState("DESC");

  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tobeUpdated, setTobeUpdated] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);


  const navigate = useNavigate();


  const fetchCustomers = async () => {
    const res = await api.get("customers", {
      headers: authHeader(),
    });
    setCustomers(res.data.data);
  };

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await api.get("samples", {
        headers: authHeader(),
      });
      console.log(res.data.data)
      setReports(res.data.data);
      setLoading(false);
    } catch (error) {
      ApiErrorHandler(error, navigate);
    }
  };

  useEffect(() => {
    loadReports();
    fetchCustomers();
  }, []);

  useEffect(() => {
    loaded;
    setLoaded(true)
  }, [currentPage]);


  const items = [
    { label: "Reference no", value: "ref-no" },
    { label: "Village", value: "village" },
    { label: "State", value: "state" },
    { label: "District", value: "district" },
    { label: "Sub district", value: "subdistrict" },
  ];

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

  const deleteItem = async (item) => {
    if (confirm("Are you sure to delete this?")) {
      try {
        await api.delete(`samples/${item.id}`, {
          headers: authHeader(),
        });
        await loadReports();
      } catch (error) {
        ApiErrorHandler(error, navigate);
      }
    }
  }

  return (
    <Container maxWidth="xxl">
      <Stack spacing={2}>
        <div style={{ display: "flex", justifyContent: "start", marginTop: '20px' }}>
          <Button variant='outlined'>Total samples: {reports.length}</Button>
        </div>
        <Paper elevation={0} variant='outlined'>
          {reports.length > 0 ? (
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography>
                        <strong>Grower Name</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Grower Reg No</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Phone No</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Section</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Area</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Age</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Target</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>District</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Sub District</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Village</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>State</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Date</strong>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <strong>Date</strong>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((row, index) => (
                    <TableRow
                      style={{ height: "6rem" }}
                      hover
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row?.grower?.name}</TableCell>
                      <TableCell>
                        {row?.grower?.reg_no}
                      </TableCell>
                      <TableCell>
                        {row?.grower?.phone}
                      </TableCell>
                      <TableCell>{row?.sample?.section_no}</TableCell>
                      <TableCell>{row?.sample?.landAreaSize}</TableCell>
                      <TableCell>{row?.sample?.age}</TableCell>
                      <TableCell>{row?.sample?.target}</TableCell>
                      <TableCell>{row?.sample?.district}</TableCell>
                      <TableCell>{row?.sample?.subdistrict}</TableCell>
                      <TableCell>{row?.sample?.village}</TableCell>
                      <TableCell>{row?.sample?.state}</TableCell>
                      <TableCell>{(new Date(row?.sample?.collectionDate)).toLocaleString()}</TableCell>
                      <TableCell>
                        <Stack direction='row' spacing={2}>
                          <IconButton onClick={() => {
                            setTobeUpdated(row);
                            setDialogOpen(true);
                          }}><Edit color="info" /></IconButton>
                          <IconButton onClick={() => deleteItem(row)}> <Delete color="error" /> </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                paddingTop: "20px",
              }}
            >
              <NoData />
            </div>
          )}
        </Paper>
      </Stack>
      <EditDialog item={tobeUpdated} open={dialogOpen} setOpen={setDialogOpen} loadReports={loadReports} />
    </Container>
  );
};

export default TeaReports;
