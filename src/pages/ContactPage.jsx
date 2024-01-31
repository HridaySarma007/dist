import React from "react";
import {
    Container,
    TextField,
    Button,
    MenuItem,
    Grid,
    Typography,
    Box,
    Stack,
    Link
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import bgImage from '../../Images/home-bg.jpg'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
                    Contact us
                </Typography>
            </Box>
            <Container maxWidth='lg' sx={{ mb: 4 }}>
                <Box sx={{ py: 6 }}>
                    <Typography variant='h6' style={{ textAlign: "center" }}>
                        If you have any question or want to know more about us drop a message
                        we will get in touch with you
                    </Typography>
                </Box>
                <Grid container>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <div
                            style={{
                                textAlign: "left",
                            }}
                        >
                            <IconText
                                sx={{py:1}}
                                icon={<LocationOnIcon color="success" />}
                                text="Arunodoi Path, Hatigaon, House No. 34"
                            />
                            <IconText
                                sx={{py:1}}
                                icon={<EmailIcon color="success" />}
                                text="info@agrithinks.com"
                            />
                            <IconText
                                sx={{py:1}}
                                icon={<CallIcon color="success" />}
                                text="+918638204202/+918486289286"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7163.7746227897815!2d91.783433!3d26.135217!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a592fde6dc1a9%3A0xa08685eb630622c9!2sArunodoi%20Path%2C%20Hatigaon%2C%20Guwahati%2C%20Assam%20781038!5e0!3m2!1sen!2sin!4v1641210968876!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                        ></iframe>
                    </Grid>
                </Grid>
                <br />
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
