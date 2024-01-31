import {Close} from "@mui/icons-material";
import {
    Autocomplete, Box, Button, Card, CardContent, CardHeader, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider, Grid, IconButton, TextField, useMediaQuery, useTheme, Stack
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {
    Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis,
    YAxis
} from "recharts";
import {boxShadow} from "../../utils";
import authHeader from "../../utils/auth-header";
import config from "../../utils/config";
import api from "../../utils/index";
import Map from "../Map";
import CustomerCard from "./Cards/CustomerCard";
import TestCard from "./Cards/TestsCard";
import TeaTestCard from "./Cards/TeaTestsCard";
import UserCard from "./Cards/UserCard";

const graphData = [
    {name: "Page A", uv: 400, pv: 2400, amt: 2400},
    {name: "Page B", uv: 300, pv: 2200, amt: 2200},
    {name: "Page C", uv: 500, pv: 2700, amt: 2700},
    {name: "Page D", uv: 250, pv: 2140, amt: 2190},
    {name: "Page E", uv: 150, pv: 1500, amt: 2000},
];

/*const data = [
  { location: [50.5, 30.5], name: "abc" },
  { location: [50.51, 30.51], name: "abcd" },
  { location: [50.52, 30.52], name: "abcde" },
];*/
const data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const user = useSelector((state) => state.auth.user);
    const isUser = () =>
        user.role && (user.role === "SUPER_USER" || user.role === "ADMIN");

    if (!isUser) {
        return <Navigate to="/login" />;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchStates();
    }, []);

    const [addressData, setAddressData] = useState({
        states: [],
        districts: [],
        subdistricts: [],
        village: [],
    });

    const [selectedOptions, setSelectedOptions] = useState({});
    const [testResult, setTestResult] = useState([]);
    const [dataUnits, setDataUnits] = useState({});

    const fetchStates = async () => {
        try {
            const response = await axios.get(config.ADDRESS_API + "/states");
            setAddressData({...addressData, ...{states: response.data}});
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDistrict = async (state) => {
        try {
            const response = await axios.get(
                config.ADDRESS_API + `/districts/state/${state.id}`
            );
            setAddressData({...addressData, ...{districts: response.data}});
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSubdistrict = async (district) => {
        try {
            const response = await axios.get(
                config.ADDRESS_API +
                `/subdistricts/state/${district.stateId}/district/${district.id}`
            );
            setAddressData({...addressData, ...{subdistricts: response.data}});
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVillage = async (subdistrict) => {
        try {
            const response = await axios.get(
                config.ADDRESS_API +
                `/villages/state/${subdistrict.stateId}/district/${subdistrict.districtId}/subdistrict/${subdistrict.id}`
            );
            setAddressData({...addressData, ...{village: response.data}});
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTestReport = async () => {
        const res = await api.get(
            `test-results?state=${selectedOptions.state.name}&district=${selectedOptions.district.name}&subdistrict=${selectedOptions.subdistrict.name}&village=${selectedOptions.village.name}`,
            {headers: authHeader()}
        );
        setOpen(false);
        setDataUnits(res.data.dataUnits);
        setTestResult(res.data.data);
    };

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

    function displayPopup(item, ref_no, units) {
        let list = [];
        for (let key in item) {
            list.push(`<li><b style="display:inline-block; width:140px">${key.toUpperCase()} :</b> ${item[key]}${" "}${units[key]} </li>`);
        }
        return `
         
          <div>
              <h4>Reference no: ${ref_no}</h4>
              <hr style="color:#f1f1f1; margin-top:-10px"/>
               <ol style="list-style:none; padding:0">
                 ${list.join('')}
               </ol>
          </div>
        `;
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3} lg={3}>
                    <TestCard />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <TeaTestCard />
                </Grid>

                {user.role === "SUPER_USER" && (
                    <Grid item xs={12} md={3} lg={3}>
                        <UserCard />
                    </Grid>
                )}

                <Grid item xs={12} md={3} lg={3}>
                    <CustomerCard />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt:2, mb:2}}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Card elevation={0} sx={{boxShadow: boxShadow}}>
                        <Map
                            filterButton={true}
                            data={testResult}
                            dataUnits={dataUnits}
                            zoom={15}
                            displayPopupProp={(item, ref_no, units) => displayPopup(item, ref_no, units)}
                            circleProps={{color: "#fa0000", radius: 3}}
                            handleClickOpen={handleClickOpen}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <Card elevation={0} variant='outlined'>
                        <CardHeader title="Latest Tests" />
                        <Divider />
                        <CardContent>
                            <Box
                                sx={{
                                    height: 200,
                                }}
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="pv"
                                            stroke="#8884d8"
                                            activeDot={{r: 8}}
                                        />
                                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <Card elevation={0} variant='outlined'>
                        <CardHeader title="Latest FarmerReports" />
                        <Divider />
                        <CardContent>
                            <Box
                                sx={{
                                    height: 200,
                                    //position: "relative",
                                }}
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart width={600} height={580} data={graphData}>
                                        <XAxis dataKey="name" stroke="#8884d8" />
                                        <YAxis />
                                        <Tooltip
                                            wrapperStyle={{width: 100, backgroundColor: "#ccc"}}
                                        />
                                        <Legend
                                            width={100}
                                            wrapperStyle={{
                                                top: 40,
                                                right: 20,
                                                backgroundColor: "#f5f5f5",
                                                border: "1px solid #d5d5d5",
                                                borderRadius: 3,
                                                lineHeight: "40px",
                                            }}
                                        />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                        <Bar dataKey="uv" fill="#1976d2" barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} fullScreen={isMobile} >
                <DialogTitle>
                    Filter
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "inherite",
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack item spacing={2} sx={{minWidth: "250px"}}>
                        <Autocomplete
                            fullWidth
                            isOptionEqualToValue={(option, value) => {
                                return option.id === value.id;
                            }}
                            getOptionLabel={(option) => option.name}
                            options={addressData.states}
                            onChange={(e, v) => {
                                setSelectedOptions({...selectedOptions, ...{state: v}});
                                fetchDistrict(v);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    variant="outlined"
                                    label="STATE"
                                />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            isOptionEqualToValue={(option, value) => {
                                return option.id === value.id;
                            }}
                            getOptionLabel={(option) => option.name}
                            options={addressData.districts}
                            onChange={(e, v) => {
                                setSelectedOptions({
                                    ...selectedOptions,
                                    ...{district: v},
                                });
                                fetchSubdistrict(v);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    variant="outlined"
                                    label="DISTRICT"
                                />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            isOptionEqualToValue={(option, value) => {
                                return option.id === value.id;
                            }}
                            getOptionLabel={(option) => option.name}
                            options={addressData.subdistricts}
                            onChange={(e, v) => {
                                setSelectedOptions({
                                    ...selectedOptions,
                                    ...{subdistrict: v},
                                });
                                fetchVillage(v);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    variant="outlined"
                                    label="SUBDISTRICT"
                                />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            isOptionEqualToValue={(option, value) => {
                                return option.id === value.id;
                            }}
                            getOptionLabel={(option) => option.name}
                            options={addressData.village}
                            onChange={(e, v) => {
                                const a = selectedOptions;
                                a.village = v;
                                setSelectedOptions(a);
                                //console.log(selectedOptions);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    variant="outlined"
                                    label="VILLAGE"
                                />
                            )}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        disableElevation
                        onClick={() => fetchTestReport()}
                        sx={{mx: 2}}
                    >
                        view
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Dashboard;
