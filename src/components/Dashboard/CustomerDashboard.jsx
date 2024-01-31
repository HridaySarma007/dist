import axios from "axios";
import React, {useEffect, useState} from "react";
import authHeader from "../../utils/auth-header";
import config from "../../utils/config";
import api from "../../utils/index";



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

const CustomerDashboard = () => {
    const [open, setOpen] = React.useState(false);

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
        setTestResult(res.data.data);
    };

    function displayPopup(item) {
        let list = [];
        for (let key in item) {
            list.push(`<li>${key.toUpperCase()} : ${item[key]} </li>`);
        }
        return `
     
     
      <div>
        <ul>
         ${list.join("")}
        </ul>
      </div>
    `;
    }

    return <div>WELCOME TO DASHBOARD</div>;
};

export default CustomerDashboard;
