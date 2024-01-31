import React, { useState } from "react";
import {
    Typography,
    Container,
    TextField,
    Button,
    Grid,
    Snackbar,
    Alert,
    Avatar,
    Stack,
    Divider,
    Card,
    CardContent,
    ListItemText,
    CardMedia,
    Link
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DownloadIcon from "@mui/icons-material/Download";
import { grey, green } from "@mui/material/colors";
import config from "../utils/config";
import axios from "axios";
import authHeader from "../utils/auth-header";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import ElectricBoltIcon from '@mui/icons-material/Bolt';
import RecommendIcon from '@mui/icons-material/Recommend';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { Box } from "@mui/system";
import bgImage from '../../Images/home-bg.jpg'
import SquareIcon from '@mui/icons-material/Square';
import cardImg from '../../Images/card.svg';

const Title = ({ text, sx }) => {
    return (
        <Stack direction='column' sx={sx} spacing={1}>
            <Typography variant="h4" sx={{ fontWeight: 'bolder' }}>{text}</Typography>
            <Box sx={{ height: '6px', width: '50px', borderRadius: '2em', bgcolor: '#c4c5c4' }} />
        </Stack>
    )
}

const ListText = ({ primary, secondary, sx }) => {
    return (
        <Stack direction='row' spacing={2} sx={sx}>
            <SquareIcon color="primary" />
            <ListItemText primary={primary} secondary={secondary} />
        </Stack>
    )
}

const IndexPage = () => {

    const [message, setMessage] = useState("");
    const [errorOpen, setErrorOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [referenceNo, setReferenceNo] = useState("");
    const [testResult, setTestResult] = useState({});
    const [dataUnits, setDataUnits] = useState({});
    const [customer, setCustomer] = useState({});

    const onChangeReferenceNo = (e) => {
        const referenceNo = e.target.value;
        setReferenceNo(referenceNo);
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

    const DownloadReport = async () => {
        if (referenceNo.length === 0) {
            setMessage("Enter reference number");
            setErrorOpen(true);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(
                config.SOILCARE_API + "/public/test-results/ref-no/" + referenceNo,
                { headers: authHeader() }
            );
            const result = response.data.testResult;
            result.samples[0] = reOrder(result.samples[0]);
            setTestResult(result);
            setDataUnits(response.data.dataUnits);
            setCustomer(response.data.customer);
            const data = {
                testResult: testResult,
                customer: customer,
                dataUnits: dataUnits,
            };
            const res = await fetch(config.PDF_SERVER + "/test-results", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "content-type": "application/json" },
            });

            const pdfUrl = URL.createObjectURL(await res.blob(), {
                download: "abcd.pdf",
            });

            const a = document.createElement("a");
            a.href = pdfUrl;
            a.download = testResult.refNo + ".pdf";
            document.body.appendChild(a);
            a.click();
            setLoading(false);
        } catch (error) {
            if (error.response.status === 404) {
                setMessage(error.response.data.error.details);
                setLoading(false);
                setErrorOpen(true);
            }
            return;
        }
    };

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Box container sx={{ background: `url(${bgImage}) no-repeat`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
                <Box sx={{ height: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Container maxWidth="lg" style={{ marginTop: matches ? 200 : 200 }}>
                        <Typography
                            variant={matches ? "h4" : "h3"}
                            component="div"
                            color='white'
                            sx={{ mt: -10, textTransform: "uppercase", fontWeight: "bolder", fontSize: matches ? 54 : 72, textAlign: 'center' }}
                        >
                            Soil Health Care
                        </Typography>
                        <Typography variant={matches ? 'h5' : 'h4'} color='white' sx={{ textAlign: 'center', my: 2 }}>
                            Soil Health Management, The Route To Quality Yield
                        </Typography>
                        <Grid container sx={{ mb: matches ? 0 : 10, mt: 6 }} spacing={4}>
                            <Grid item xs={12} sm={12} md={6} lg={6} sx={{ textAlign: matches ? 'center' : 'right' }}>
                                <a href="mailto:info@agrithinks.com" style={{ textDecoration: 'none' }}>
                                    <Button
                                        sx={{ color: 'white', height: matches ? 48 : 54, fontSize: '1.2em' }}
                                        size='large'
                                        color="primary"
                                        variant='contained'
                                        disableElevation
                                    ><b>Book you appointment</b></Button>
                                </a>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} sx={{ textAlign: matches ? 'center' : 'left' }}>
                                <a href="#download" style={{ textDecoration: 'none' }}>
                                    <Button
                                        sx={{ color: 'white', height: matches ? 48 : 54, fontSize: '1.2em' }}
                                        size='large'
                                        color="secondary"
                                        variant='contained'
                                        disableElevation
                                    ><b>Download Your Report</b></Button>
                                </a>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign:'center', mt:4 }}>
                                <a href="/sample-collection" style={{ textDecoration: 'none' }}>
                                    <Button
                                        sx={{ color: 'white', height: matches ? 48 : 54, fontSize: '1.2em' }}
                                        size='large'
                                        color="error"
                                        variant='contained'
                                        disableElevation
                                    ><b>Submit sample details</b></Button>
                                </a>
                            </Grid>
                        </Grid>

                    </Container>
                    {!matches && <Divider orientation='vertical' />}
                </Box>

            </Box>
            <Box sx={{ py: 8 }}>
                <Container maxWidth='lg'>
                    <Grid container spacing={2} sx={{ display: "flex" }}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Title sx={{ mb: 3 }} text='Take care of your soil with' />
                            <ListText sx={{ py: 2 }} primary="NPK Test" secondary='Time to time NPK test is the First step towards effective scientific cultivation.' />
                            <ListText sx={{ py: 2 }} primary="EC, pH and Organic Carbon" secondary='Soil amendments as per soil test value maintains nutrient balance. Application of
organic matter improves soil quality.' />
                            <ListText sx={{ py: 2 }} primary="Micro nutrient" secondary='A slight deviation from desired value may lead to crop loss.' />
                            <ListText sx={{ py: 2 }} primary="Calculation of Nutrient Requirements" secondary='Precise decision on nutrient requirement based on timely soil test adds to the lush
greenery of your field.' />
                            <ListText sx={{ py: 2 }} primary="Fertilizer Recommendation" secondary='Crop and site specific fertilizer application as per Nutrient Requirement optimizes
yield besides sustaining soil health.' />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} sx={{ mt: matches ? 0 : 10 }}>
                            <Card variant="outlined">
                                <CardMedia component='img' image={cardImg} />
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Divider />
            <Box sx={{ py: 8 }}>
                <Container maxWidth='lg'>
                    <Grid container spacing={2} sx={{ display: "flex" }}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Title sx={{ mb: 3 }} text='About Us' />
                            <Typography sx={{my:2}}>Agrithink Services LLP is a company from Guwahati, Assam, working in the field of Agritech. With the mission of serving the people of the region, we started various R&D activities in the fields of agriculture and allied sector. After months of dedicated team work we have been able to develop breakthrough products using ICT like IoT and Cloud-based solutions. We provide Smart Agriculture solutions for managing field parameters for increasing crop yield and improving productivity.</Typography>
                            <Typography sx={{my:2}}>Soil health is the most important aspect while talking about farm management. Healthy soil is the foundation of a healthy crop and healthy farm. Soil Care is a server aided cloud IoT based system amalgamated with AI which not only gives instant soil test values but also generates real-time data for analysis. The accuracy of the test result is the forte of the design by Agrithink. Expeditious expert solutions/recommendation is also provided to the client in different smart modes for augmenting soil health and productivity.</Typography>
                            <Typography sx={{my:2}}>Soil care defines the nutrient status of soil based on which customer gets nutrient requirement of the crop of his choice instantly. The instant nature of the system waives the time of waiting for reports unlike conventional system. Supported by domain experts he/she can get the best fertilizer recommendation for his farm.</Typography>
                            <Typography sx={{my:2}}>Most farmers need fast, easy and economic soil testing solutions. Most importantly they do not have any data (current or historical) on the soil where they are engaged in farming. We are addressing this need by working on a solution that will not only enable them to know about their soil health position but also will enable them to have a periodical database of their cultivating soil.  There is also an immense possibility of generating a soil nutrient status map across the nation on all farm soils using our innovation.</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Divider />
            <Box sx={{ py: 8 }} id='download'>
                <Container maxWidth='lg'>
                    <Grid container spacing={2} sx={{ display: "flex" }}>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Container maxWidth="xs">
                                <Stack spacing={2}>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>Enter your reference number below</Typography>
                                    <TextField
                                        label="EX: AS-000000000123"
                                        variant="outlined"
                                        value={referenceNo}
                                        onChange={onChangeReferenceNo}
                                        size="small"
                                    />
                                    <LoadingButton
                                        loading={loading}
                                        sx={{ mt: 1,color: '#fff' }}
                                        type="submit"
                                        onClick={() => DownloadReport()}
                                        color="primary"
                                        size="large"
                                        variant="contained"
                                        startIcon={<DownloadIcon />}
                                        disableElevation
                                        // sx={{ color: '#fff', mt: 3 }}
                                    >
                                        <b>Download</b>
                                    </LoadingButton>
                                </Stack>
                            </Container>
                            <Snackbar
                                open={errorOpen}
                                onClose={() => setErrorOpen(false)}
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            >
                                <Alert severity="error">{message}</Alert>
                            </Snackbar>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
                <Container maxWidth='md'>
                    <Grid container spacing={2} sx={{ display: "flex" }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Stack direction='row' spacing={2} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Link underline="none"> Privacy Policy</Link>
                                <Link underline="none"> T&C</Link>
                                <Link underline="none"> FAQ</Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography sx={{ textAlign: matches ? 'left' : 'right' }}>Copyright <Link target='_blank' href='https://agrithinks.com' underline="none">Agrithinks</Link> 2019-2022 </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default IndexPage;
