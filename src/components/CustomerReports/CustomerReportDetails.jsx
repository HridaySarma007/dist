import React, {useState, useEffect} from "react";
import {
    Box,
    Tab,
    Tabs,
    Button,
    List,
    ListItem,
    IconButton,
    Card,
    CardContent,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Add,
    Map,
    Download,
    Visibility,
    TextSnippet,
} from "@mui/icons-material";
import config from "../../utils/config";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import DisplaySample from "../DisplaySample";
//import { fetchCustomerById, fetchReport } from "../../api";
import Spinner from "../Spinner/Spinner";
import DisplaySampleInCard from "../DisplaySampleInCard";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import {formatDateTime} from "../../utils/helpers";
import ReportOnMap from "../TestReports/ReportOnMap";
import {jsPDF} from "jspdf";
import Logo from "../../../Images/logo.png";
import autoTable from "jspdf-autotable";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 1}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CustomerReportDetails = (props) => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reportDetails, setReportDetails] = useState({});
    const [customer, setCustomer] = useState();
    const [dataUnits, setDataUnits] = useState({});


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const token = JSON.parse(localStorage.getItem("customer_token"));

    const axiosConfig = {
        headers: {
            "X-Auth-Token": token,
            "Content-Type": "application/json",
        },
    };

    const fetchCustomerById = async function (customerId) {
        const response = await axios.get(
            config.SOILCARE_API + `/customers/${customerId}`,
            axiosConfig
        );
        return response.data.data;
    };

    const fetchReport = async function ({id}) {
        console.log(id);
        const res = await axios.get(
            config.SOILCARE_API + `/test-results/${id}`,
            axiosConfig
        );
        return res.data;
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

    const fetchData = async function () {
        try {
            setIsLoading(true);
            let {data, dataUnits} = await fetchReport({id: props.id});
            const customer = await fetchCustomerById(data.customerId);
            data.samples[0] = reOrder(data.samples[0]);
            setReportDetails(data);
            setDataUnits(dataUnits);
            setCustomer(customer);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            ApiErrorHandler(error, navigate);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(reportDetails);

    const DownloadReportFromServer = async () => {
        setLoading(true);
        const data = {
            testResult: reportDetails,
            customer: customer,
            dataUnits: dataUnits,
        };
        const res = await fetch(config.PDF_SERVER + "/test-results", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"},
        });

        const pdfUrl = URL.createObjectURL(await res.blob(), {
            download: "abcd.pdf",
        });
        setLoading(false);
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = reportDetails.refNo + ".pdf";
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
                <Spinner/>
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
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        {!isMatch && <Typography variant='h4'>{reportDetails.refNo}</Typography>}
                        <LoadingButton
                            loading={loading}
                            sx={{marginRight: "5px", mb: 1}}
                            startIcon={<Download/>}
                            color="primary"
                            variant="outlined"
                            onClick={DownloadReportFromServer}
                        >
                            Download Report
                        </LoadingButton>
                    </div>
                </Grid>
            </Grid>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" scrollButtons='auto'>
                    <Tab label="Test Details" {...a11yProps(0)} />
                    <Tab label="Parameter" {...a11yProps(1)} />
                    <Tab label="Map view" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={8}>
                        <p>
                            <strong style={{...(!isMatch && {width: "200px", display: "inline-block"})}}>Ref.
                                No.:</strong> {isMatch && <br></br>} {reportDetails.refNo}

                        </p>
                        <p>
                            <strong style={{...(!isMatch && {width: "200px", display: "inline-block"})}}>Customer
                                Name: </strong> {isMatch && <br></br>}
                            <Typography sx={{display: "inline"}}>
                                {customer?.fullName}
                            </Typography>
                        </p>

                        <p>
                            <strong style={{
                                ...(!isMatch && {
                                    width: "200px",
                                    display: "inline-block"
                                })
                            }}>Location: </strong>{isMatch && <br></br>}
                            {reportDetails.location}
                        </p>
                        <p>
                            <strong style={{...(!isMatch && {width: "200px", display: "inline-block"})}}>Land area
                                size: </strong>{isMatch && <br></br>}
                            {reportDetails.landAreaSize}
                        </p>
                        <p>
                            <strong style={{...(!isMatch && {width: "200px", display: "inline-block"})}}>Tested
                                At: </strong>{isMatch && <br></br>}
                            {reportDetails.additionalParameters !== undefined &&
                                formatDateTime(reportDetails?.additionalParameters?.testedAt)}
                        </p>
                        <p>
                            <strong style={{
                                ...(!isMatch && {
                                    width: "200px",
                                    display: "inline-block"
                                })
                            }}>Remarks: </strong>{isMatch && <br></br>}
                            {reportDetails.additionalParameters !== undefined &&
                                reportDetails?.additionalParameters?.remarks}
                        </p>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <p>
                            <strong style={{
                                ...(!isMatch && {
                                    width: "200px",
                                    display: "inline-block"
                                })
                            }}>State: </strong>{isMatch && <br></br>}
                            {reportDetails.state}
                        </p>
                        <p>
                            <strong style={{
                                ...(!isMatch && {
                                    width: "200px",
                                    display: "inline-block"
                                })
                            }}>District: </strong>{isMatch && <br></br>}
                            {reportDetails.district}
                        </p>
                        <p>
                            <strong style={{
                                ...(!isMatch && {
                                    width: "200px",
                                    display: "inline-block"
                                })
                            }}>Subdistrict: </strong>{isMatch && <br></br>}
                            {reportDetails.subdistrict}
                        </p>
                        <p>
                            <strong style={{
                                ...(!isMatch && {
                                    width: "200px",
                                    display: "inline-block"
                                })
                            }}>Village: </strong>{isMatch && <br></br>}
                            {reportDetails.village}
                        </p>
                        <p>
                            <strong style={{...(!isMatch && {width: "200px", display: "inline-block"})}}>Field
                                Type: </strong>{isMatch && <br></br>}
                            {reportDetails.additionalParameters !== undefined &&
                                reportDetails?.additionalParameters?.fieldType}
                        </p>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {isMatch ? (
                    reportDetails.samples !== undefined &&
                    DisplaySampleInCard({
                        data: reportDetails.samples[0],
                        dataUnits: dataUnits,
                    })
                ) : (
                    <div style={{marginTop: "15px"}}>
                        {reportDetails.samples !== undefined &&
                            DisplaySample({
                                data: reportDetails.samples[0],
                                dataUnits: dataUnits,
                                isTea: false,
                            })}
                    </div>
                )}
            </TabPanel>
            <TabPanel value={value} index={2}>
            {reportDetails?.location?.length > 0 ? <ReportOnMap data={{ data: [reportDetails], dataUnits: dataUnits }}/> : <span>No Data Available</span>}
            </TabPanel>
        </>
    );
};
export default CustomerReportDetails;
