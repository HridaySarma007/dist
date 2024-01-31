import {yupResolver} from "@hookform/resolvers/yup";
import {
    Autocomplete, Box,
    Button,
    Card,
    CardContent, Divider,
    Grid, TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import authHeader from "../../utils/auth-header";
import "../../utils/crops.json";
import api from "../../utils/index";

const GenerateRecommForm = (props) => {
    const validationSchema = Yup.object().shape({
        crops: Yup.string().required("select crop"),
        method: Yup.string().required("select method"),
        targetYield: Yup.string().required("This field is required"),
    });

    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState({});
    const [crops, setCrops] = useState([]);
    const [targetYield, setTargetYield] = useState("");
    const [method, setMethod] = useState("");

    const fetchCrops = async () => {
        try {
            const response = await api.get("corps", {headers: authHeader()});
            setCrops(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCrops();
    }, []);


    const onSubmit = (data) => console.log(data);

    function onClickHandler() {
        navigate(
            "/nutrient-requirements/test/" +
            props.id +
            "/" +
            selectedOptions.crop.id +
            "/" +
            targetYield +
            "/" +
            method
        );
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card elevation={0} variant='outlined'>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} lg={4}>
                                <Autocomplete
                                    id="size-small-outlined"
                                    size="small"
                                    isOptionEqualToValue={(option, value) => {
                                        return option.id === value.id;
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    options={crops}
                                    onChange={(e, v) => {
                                        setSelectedOptions({...selectedOptions, ...{crop: v}});
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="crops"
                                            {...register("crops")}
                                            error={errors.crops ? true : false}
                                            helperText={errors.crops?.message}
                                            label="Select crop"
                                            placeholder="search crops"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Autocomplete
                                    fullWidth
                                    options={["IPNS", "CHEMICAL", "ORGANIC"]}
                                    disableClearable
                                    onChange={(e, v) => setMethod(v)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="method"
                                            {...register("method")}
                                            error={errors.method ? true : false}
                                            helperText={errors.method?.message}
                                            size="small"
                                            variant="outlined"
                                            label="METHOD"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Target Yield"
                                    name="targetYield"
                                    onKeyUp={(e) => setTargetYield(e.target.value)}
                                    {...register("targetYield")}
                                    error={errors.targetYield ? true : false}
                                    helperText={errors.targetYield?.message}
                                    variant="outlined"
                                    size="small"
                                    helperText="Target yieled in Quintal"
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
                            onClick={() => onClickHandler()}
                            type="submit"
                            color="primary"
                            variant="contained"
                        //startIcon={<SaveIcon />}
                        >
                            View
                        </Button>
                    </Box>
                </Card>
            </form>
        </>
    );
};

export default GenerateRecommForm;
