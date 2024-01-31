import React from "react";
import ReactDOM from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import App from "./App";
import {createTheme, ThemeProvider} from "@mui/material";
//css basseline to reove default margin pading
import {Provider} from "react-redux";
import store from "./redux/store";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {green, orange} from '@mui/material/colors';


const theme = createTheme({
    palette: {
        primary: green,
        secondary: orange,
        error: {
            main: "#fc0416",
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <App />
                </MuiPickersUtilsProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

////css basseline to reove default margin pading If you want to start meas//css basseline to reove default margin padinguring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or//css basseline to reove default margin pading send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
