import React, { useEffect, useState } from "react";
import {
    Container,
    TextField,
    Button,
    MenuItem,
    Grid,
    Typography,
    Box,
    Stack,
    Link,
    Divider,
    Snackbar
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import bgImage from '../../Images/home-bg.jpg'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import validator from "validator";
import { ErrorRounded, VpnLock } from "@mui/icons-material";
import axios from "axios";
import config from "../utils/config";
import _ from "lodash";
import EnglishPdf from "../../files/english.pdf"
import AssamesePdf from "../../files/assamese.pdf"
const useStyles = makeStyles({
    icon: {
        fontSize: "30px",
        color: "#1fa405",
        float: "left",
        width: "30px",
        height: "25px",
        background: "#fff",
        marginTop: "20px",
    },
});

function ContactPage() {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const IconText = ({ icon, text, sx }) => (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                ...sx
            }}
        >
            <span style={{ marginRight: "15px" }}>{icon}</span> {text}
        </Box>
    );

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
        if (validator.isEmpty(values.regiona_office)) {
            vError.regiona_office = "Regional office required"
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
        if (!validator.isEmpty(values.section_no) && !validator.isNumeric(values.section_no) ) {
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

        if(!validator.isEmpty(values.age) && values.age.length > 2 ) {
            vError.age = "Plant age must be a two digit"
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
        data.reg_no = values.reg_no.toUpperCase();
        try {
            await axios.post(`${config.SOILCARE_API}/samples`, data);
            alert("Sample Data submited sucessfully");
        } catch (err) {
            console.log(err)
            alert("Ubable to submit sample data");
        }

    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                setLoaction([position.coords.latitude, position.coords.longitude]);
            }, () => {
                alert("Please give permission to access the location")
            });
        }
    }, [])

    return (
        <>
            <Box sx={{ py: 8, background: `url(${bgImage}) no-repeat`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
                <Typography
                    variant="h4"
                    component="div"
                    sx={{
                        mt: 8,
                        color: 'white',
                        textTransform: "uppercase",
                        textAlign: "center",
                    }}
                >
                    Submit your sample details
                </Typography>
            </Box>
            <Container maxWidth='lg' sx={{ my: 6 }}>
                <Stack sx={{my:2}} spacing={2}>
                    <a download={EnglishPdf} target="_blank" href={EnglishPdf} style={{textDecoration:'none'}}><Button color='warning' variant="outlined"> Click here Instructions for soil sample collection (English)</Button></a>
                    <a download={AssamesePdf} target="_blank" href={AssamesePdf} style={{textDecoration:'none'}}><Button color='warning' variant="outlined"> Click here Instructions for soil sample collection (Assamese)</Button></a>
                </Stack>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5">Grower Details</Typography>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Grower/Garden Name*" 
                                name="grower_name"
                                variant="filled"
                                size="small"
                                error={errors?.grower_name?.length > 0}
                                helperText={errors?.grower_name || 'নাম *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Phone*"
                                name="phone"
                                variant="filled"
                                size="small"
                                error={errors?.phone?.length > 0}
                                helperText={errors?.phone || 'মোবাইল নম্বৰ *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Grower Address*"
                                name="grower_address"
                                variant="filled"
                                size="small"
                                error={errors?.grower_address?.length > 0}
                                helperText={errors?.grower_address || 'ঠিকনা *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Grower Registration number*"
                                name="reg_no"
                                variant="filled"
                                size="small"
                                error={errors?.reg_no?.length > 0}
                                helperText={errors?.reg_no || 'পজ্ঞীয়ন নম্বৰ *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Regional office*"
                                name="regiona_office"
                                variant="filled"
                                size="small"
                                error={errors?.regiona_office?.length > 0}
                                helperText={errors?.regiona_office || 'আঞ্চলিক কাৰ্যালয় *'}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h5" sx={{ mt: 3 }}>Sample Details</Typography>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Section No.*"
                                name="section_no"
                                variant="filled"
                                size="small"
                                error={errors?.section_no?.length > 0}
                                helperText={errors?.section_no || 'মাটিৰ অংশৰ নম্বৰ *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Land Area Size In Hac/Bigha *"
                                name="area"
                                variant="filled"
                                size="small"
                                error={errors?.area?.length > 0}
                                helperText={errors?.area || 'মাটি কালি *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Plant Age must be in year *"
                                name="age"
                                variant="filled"
                                size="small"
                                error={errors?.age?.length > 0}
                                helperText={errors?.age || 'গছৰ বয়স *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Target Yield/Yield of preceding cycle"
                                name="target"
                                variant="filled"
                                size="small"
                                error={errors?.target?.length > 0}
                                helperText={errors?.target || 'যোৱা বছৰৰ প্ৰতি বিঘাত পোৱা উৎপাদন *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Village*"
                                name="village"
                                variant="filled"
                                size="small"
                                error={errors?.village?.length > 0}
                                helperText={errors?.village || 'গাওঁ *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="Subdistrict*"
                                name="subdistrict"
                                variant="filled"
                                size="small"
                                error={errors?.subdistrict?.length > 0}
                                helperText={errors?.subdistrict || 'মহকুমা *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="District*"
                                name="district"
                                variant="filled"
                                size="small"
                                error={errors?.district?.length > 0}
                                helperText={errors?.district || 'জিলা *'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                fullWidth
                                label="State*"
                                name="state"
                                variant="filled"
                                size="small"
                                error={errors?.state?.length > 0}
                                helperText={errors?.state || 'ৰাজ্য *'}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: "end" }}>
                            <Button type="submit" size="large" disableElevation variant='contained'>Submit</Button>
                        </Grid>
                    </Grid>

                </form>
            </Container>
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
}
export default ContactPage;
