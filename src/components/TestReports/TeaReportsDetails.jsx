import {
  Download, EditOutlined, Map, TextSnippet
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button, Card, CardContent, Grid, IconButton, Typography, useMediaQuery, useTheme
} from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Logo from "../../../Images/newlogo.png"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCustomerById, fetchReport } from "../../api";
import ApiErrorHandler from "../../utils/ApiErrorHandler";
import config from "../../utils/config";
import { formatDateTime } from "../../utils/helpers";
import DisplaySample from "../DisplaySample";
import DisplaySampleInCard from "../DisplaySampleInCard";
import Spinner from "../Spinner/Spinner";
import ReportOnMap from "./ReportOnMap";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (<div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (<Box sx={{ p: 1 }}>
      <Typography>{children}</Typography>
    </Box>)}
  </div>);
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TeaReportDetails = (props) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportDetails, setReportDetails] = useState({});
  const [customer, setCustomer] = useState();
  const [dataUnits, setDataUnits] = useState({});

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      moisture: sample.moisture,
    };
  }

  const fetchData = async function() {
    try {
      setIsLoading(true);
      let { data, dataUnits } = await fetchReport({ id: props.id });
      const customer = await fetchCustomerById(data.customerId);
      data.samples[0] = reOrder(data.samples[0]);
      setReportDetails(data);
      setDataUnits(dataUnits);
      setCustomer(customer);
      setIsLoading(false);
    } catch (error) {
      ApiErrorHandler(error, navigate);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* Download test report in PDF */
  const DownloadReport = async () => {
    const doc = new jsPDF();
    doc.setProperties({
      title: 'SOIL HEALTH CARD',
      subject: 'This is soil health card for' + reportDetails.refNo,
      author: 'Sio Health',
      tableLineColor: [189, 195, 199],
      tableLineWidth: 1,
      theme: "plain",
      keywords: 'soil, health, card, report, test, result',
      creator: 'Soil Health'
    });
    let offSet = 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(21);
    let xOffset = 10;
    let yOffset = 5;
    doc.text("SOIL HEALTH CARD", xOffset, offSet + yOffset);
    doc.setFontSize(9);
    doc.text("Agrithink Services LLP", 10, offSet + 10);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Reg. Off. House No 34, Arunodoi Path, Hatigaon, Guwahati\n" + "Kamrup (M), Assam,781006,India\n" + "Website: https://soilcare.in, Email: info@agrithinks.com\n" + "Phone: +91 8486289286 / +91 8638204202", 10, offSet + 13);
    doc.setFontSize(11.5);
    doc.setFont("helvetica", "bold");
    doc.addImage(Logo, 'PNG', 170, offSet + 5, 18, 18);
    doc.text("Report No: " + reportDetails.refNo.toString(), 14, offSet + 28);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    // First Two Tables //
    autoTable(doc, {
      startY: offSet + 30,
      styles: {
        font: "helvetica",
        fontSize: 7,
        cellPadding: 1,
        cellWidth: 'wrap',
        halign: 'center',
        valign: 'middle'
      },
      head: [[{
        content: "GROWER DETAILS",
        colSpan: 4,
        styles: { halign: "center", fontStyle: "bold", fontSize: 9 }
      }]],
      body: [[{ content: "Tea Grower Name", styles: { halign: "left", fontStyle: "bold", fontSize: 8 } }, {
        content: reportDetails.grower.name,
        styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
      }, { content: "Mobile No", styles: { halign: "left", fontStyle: "bold", fontSize: 8 } }, {
        content: reportDetails.grower.phone,
        styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
      }], [{ content: "Address:", styles: { halign: "left", fontStyle: "bold", fontSize: 8 } }, {
        content: reportDetails.grower.address,
        styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
      }, { content: "Grower Registration No", styles: { halign: "left", fontStyle: "bold", fontSize: 8 } }, {
        content: reportDetails.grower.reg_no, styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
      }]],
      bodyStyles: {
        lineWidth: 0.2,
        lineColor: [73, 138, 159]
      },
      theme: "plain",
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });
    autoTable(doc, {
      startY: offSet + 50.5,
      styles: {
        font: "helvetica",
        fontSize: 7,
        cellPadding: 1,
        cellWidth: 'wrap',
        halign: 'center',
        valign: 'middle'
      },
      head: [[{
        content: "SAMPLE DETAILS",
        colSpan: 4,
        styles: { halign: "center", fontStyle: "bold", fontSize: 9 }
      }]],
      body: [
        [{
          content: "Sample Tested Date :",
          styles: { fontSize: 8, halign: "left", fontStyle: "bold", cellWidth: 40 }
        }, {
          content: formatDateTime(reportDetails.additionalParameters.testedAt),
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 },
        }, { content: "LatLng", styles: { halign: "left", fontStyle: "bold", fontSize: 8, } }, {
          content: reportDetails.location ? reportDetails.location[0] + " | " + reportDetails.location[1] : '',
          styles: { halign: "left", fontStyle: "bold", fontSize: 8, }
        }], [{ content: "Address:", styles: { halign: "left", fontSize: 8, fontStyle: "bold", cellWidth: 40 } }, {
          content: reportDetails.grower.address,
          styles: { fontStyle: "bold", halign: "left", fontSize: 8 }
        },],
        [
          {
            content: "Land Area Size",
            styles: { halign: "left", fontSize: 8, fontStyle: "bold", cellWidth: 40 }
          },
          {
            content: reportDetails.landAreaSize || "0",
            styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
          },
          { content: "Section No", styles: { halign: "left", fontSize: 8, fontStyle: "bold", cellWidth: 40 } },
          {
            content: reportDetails.section_no,
            styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
          }
        ],
        [{
          content: "Young / Mature Tea",
          styles: { halign: "left", fontSize: 8, fontStyle: "bold", cellWidth: 40 }
        }, {
          content: reportDetails.age < 5 ? "Young" : "Matured",
          styles: { halign: "left", fontSize: 8, fontStyle: "bold" }
        }, {
          content: "Target Yield/Yield of preceding cycle",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.target != null ? reportDetails.target : reportDetails.target,
          styles: { halign: "left", fontStyle: "bold", cellWidth: 40, fontSize: 8 }
        }], [{ content: "Remarks", styles: { halign: "left", fontSize: 8, fontStyle: "bold", cellWidth: 40 } }, {
          content: reportDetails.remarks != null ? reportDetails.remarks : "",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }],],
      bodyStyles: {
        lineWidth: 0.2,
        lineColor: [73, 138, 159]
      },
      theme: "plain",
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });
    // First Two Tables //


    // Third , Fourth & Fifth Table
    autoTable(doc, {
      startY: offSet + 90.5,
      styles: {
        font: "helvetica",
        fontSize: 7,
        cellPadding: 1.5,
        cellWidth: 'wrap',
        halign: 'center',
        valign: 'middle'
      },
      head: [[{
        content: "TOP SOIL REPORT",
        colSpan: 4,
        styles: { halign: "center", fontStyle: "bold", fontSize: 9 }
      }]],
      body: [
        [{ content: "SL NO.", styles: { halign: "center", fontStyle: "bold", cellWidth: 15, fontSize: 8 }, }, {
          content: "PARAMETER",
          styles: { halign: "center", fontStyle: "bold", cellWidth: 75, fontSize: 8 },
        }, {
          content: "TEST VALUE", styles: { halign: "center", fontStyle: "bold", cellWidth: 45, fontSize: 8 },
        }, {
          content: "UNIT",
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 },
        },],
        [{ content: "1", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "pH",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: Number(reportDetails.samples[0].ph).toFixed(2),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, { content: "", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }],
        [{ content: "2", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "Organic Carbon (OC)",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, { content: Number(reportDetails.samples[0].organicCarbon).toFixed(3), styles: { halign: "center", fontStyle: "bold" } }, {
          content: "%",
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        },],
        [{ content: "3", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "Potassium (K2O)",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: Number(reportDetails.samples[0].potassium).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, { content: "kg/ha", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } },],
        [{ content: "4", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "Sulphur (S)",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: Number(reportDetails.samples[0].sulphur).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, { content: "mg/kg", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } },],
      ],
      bodyStyles: {
        lineWidth: 0.2,
        lineColor: [73, 138, 159]
      },
      theme: "plain",
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });
    autoTable(doc, {
      startY: offSet + 128.3,
      styles: {
        font: "helvetica",
        fontSize: 7,
        cellPadding: 1.5,
        cellWidth: 'wrap',
        halign: 'center',
        valign: 'middle'
      },
      head: [[{ content: "MICRO NUTRIENT", colSpan: 4, styles: { halign: "center", fontSize: 9 } }]],
      body: [
        [{ content: "1", styles: { halign: "center", cellWidth: 15, fontStyle: "bold", fontSize: 8 } },
        { content: "Zinc", styles: { halign: "left", fontStyle: "bold", cellWidth: 75, fontSize: 8 } },
        {
          content: Number(reportDetails.samples[0].zinc).toFixed(3),
          styles: { fontStyle: "bold", halign: "center", cellWidth: 45, fontSize: 8 },
        }, {
          content: "mg/kg", styles: { halign: "center", fontStyle: "bold", fontSize: 8 },
        },],
        [{ content: "2", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "Boron",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: Number(reportDetails.samples[0].boron).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, { content: "mg/kg", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } },],
        [{ content: "3", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "Iron",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: Number(reportDetails.samples[0].iron).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, { content: "mg/kg", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } },],
        [{ content: "4", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "Manganese",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: Number(reportDetails.samples[0].manganese).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, { content: "mg/kg", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } },],
        [{ content: "5", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "Copper",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: Number(reportDetails.samples[0].copper).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, { content: "mg/kg", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } },],
      ],
      bodyStyles: {
        lineWidth: 0.2,
        lineColor: [73, 138, 159]
      },
      theme: "plain",
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });
    autoTable(doc, {
      startY: offSet + 166,
      styles: {
        font: "helvetica",
        fontSize: 7,
        cellPadding: 2,
        cellWidth: 'wrap',
        halign: 'center',
        valign: 'middle'
      },
      head: [[{
        content: "SUB SOIL REPORT",
        colSpan: 4,
        styles: { halign: "center", fontSize: 9, fontStyle: "bold" }
      }]],
      body: [
        [{ content: "SL NO.", styles: { halign: "center", fontStyle: "bold", cellWidth: 15, fontSize: 8 }, }, {
          content: "PARAMETER",
          styles: { halign: "center", fontStyle: "bold", cellWidth: 75, fontSize: 8 },
        }, {
          content: "TEST VALUE", styles: { halign: "center", fontStyle: "bold", cellWidth: 45, fontSize: 8 },
        }, {
          content: "UNIT",
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 },
        },],
        [{ content: "1", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "pH",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: Number(reportDetails.samples[1].ph).toFixed(2),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, { content: "", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }],
        [{ content: "2", styles: { halign: "center", fontStyle: "bold", fontSize: 8 } }, {
          content: "Organic Carbon (OC)",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, { content: Number(reportDetails.samples[1].organicCarbon).toFixed(3), styles: { halign: "center", fontStyle: "bold" } }, {
          content: "%",
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        },]
      ],
      bodyStyles: {
        lineWidth: 0.2,
        lineColor: [73, 138, 159]
      },
      theme: "plain",
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });

    // Third , Fourth & Fifth Table

    // Final Two Tables //
    autoTable(doc, {
      startY: offSet + 198,
      styles: {
        font: "helvetica",
        fontSize: 7,
        cellPadding: 2,
        cellWidth: 'wrap',
        halign: 'center',
        valign: 'middle'
      },
      // head: [[{content: "NUTRIENT REQUIREMENT DETAILS",colSpan:4, styles: {halign: "center"}}]],
      body: [
        [
          {
            content: "NUTRIENT REQUIREMENT DETAILS",
            styles: { halign: "left", fontSize: 9, fontStyle: "bold", cellWidth: 100 }
          },
          {
            content: "VALUE \n In (Kg/Bigha)",
            styles: { halign: "center", fontStyle: "bold", cellWidth: 50, fontSize: 8 }
          }, {
            content: "VALUE \n In (Kg/Ha)",
            styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
          },],
        [{
          content: "Nitrogen",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.required_nutrient.nitrogen < 0 ? "0" : Number(reportDetails.required_nutrient.nitrogen / 7.4749).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.required_nutrient.nitrogen < 0 ? "0" : Number(reportDetails.required_nutrient.nitrogen).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 },
        },],
        [{
          content: "Phosphorus",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.required_nutrient.phosphorus < 0 ? "0" : Number(reportDetails.required_nutrient.phosphorus / 7.4749).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.required_nutrient.phosphorus < 0 ? "0" : Number(reportDetails.required_nutrient.phosphorus).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 },
        },],
        [{
          content: "Potassium",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.required_nutrient.potassium < 0 ? "0" : Number(reportDetails.required_nutrient.potassium / 7.4749).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.required_nutrient.potassium < 0 ? "0" : Number(reportDetails.required_nutrient.potassium).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 },
        },],
      ],
      bodyStyles: {
        lineWidth: 0.2,
        lineColor: [73, 138, 159]
      },
      theme: "plain",
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });
    autoTable(doc, {
      startY: offSet + 230.3,
      styles: {
        font: "helvetica",
        fontSize: 7,
        cellPadding: 2,
        cellWidth: 'wrap',
        halign: 'center',
        valign: 'middle'
      },
      head: [[{
        content: "FERTILIZER RECOMMENDATION",
        colSpan: 3,
        styles: { halign: "left", fontStyle: "bold", fontSize: 9 }
      }]],
      body: [

        [{
          content: "Urea",
          styles: { halign: "left", fontStyle: "bold", cellWidth: 100, fontSize: 8 }
        }, {
          content: reportDetails.fertilizer_recomm.urea < 0 ? "0" : (Number(reportDetails.fertilizer_recomm.urea / 7.4749)).toFixed(3),
          styles: { halign: "center", cellWidth: 50, fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.fertilizer_recomm.urea < 0 ? "0" : (Number(reportDetails.fertilizer_recomm.urea)).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 },
        },],
        [{
          content: "SSP",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.fertilizer_recomm.ssp < 0 ? "0" : (Number(reportDetails.fertilizer_recomm.ssp / 7.4749)).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.fertilizer_recomm.ssp < 0 ? "0" : (Number(reportDetails.fertilizer_recomm.ssp)).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 },
        },],
        [{
          content: "MOP",
          styles: { halign: "left", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.fertilizer_recomm.mop < 0 ? "0" : (Number(reportDetails.fertilizer_recomm.mop / 7.4749)).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 }
        }, {
          content: reportDetails.fertilizer_recomm.mop < 0 ? "0" : (Number(reportDetails.fertilizer_recomm.mop)).toFixed(3),
          styles: { halign: "center", fontStyle: "bold", fontSize: 8 },
        }],
      ],
      bodyStyles: {
        lineWidth: 0.2,
        lineColor: [73, 138, 159]
      },
      theme: "plain",
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });
    // Final Two Tables //

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(" - Add FYM @1.34t/bigha or 10t/ha." +
      "\n - Maintain soil pH between 4.5 -5.5. If pH<4.5, add dolomite@268kg/bigha or 2t/ha." +
      "\n   From  pH4.5-4.75 add dolomite@134kg/bigha; No need to ameliorate from pH 4.76-5.5." +
      "\n - If pH >5.5 broadcast  Iron Pyrite @ 134kg/bigha or 1t/ha in moist soil and fork it." +
      "\n - If topsoil organic carbon content is less than 1%, apply an additional dose of cattle manure/compost @400kg/bigha/yr or 3t/ha/yr." +
      "\n - Sulphur manuring @2.7kg/bigha or 20kg/ha is needed if the status is below 30ppm(30mg/kg).", 14, offSet + 265);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("This document is computer generated and does not require signature or Company’s stamp", 45, offSet + 291)
    // doc.text("" +
    //     "a) If topsoil organic carbon content is less than 1%, apply well decomposed cattle manure/compost @ 3 to 5 MT/ha/year or  oil cake " +
    //     "Organic compost (1:3) @\n      2-3MT/ha/year or decomposed tea waste 1-2 MT/ha/year. Pruned  litters should be retained in the section." +
    //     "\nb) Sulphur manuring @20kg /ha is needed if the status is below 30 ppm." +
    //     "\nc) If any form of S is already added for pH, the amount of sulphur to be applied for sulphur deficiency has to be adjusted.", 22, offSet + 275);
    //
    doc.save(reportDetails.refNo + ".pdf");
  };


  const deleteRepost = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (confirm("Are you sure want to delete this?")) {
      const res = await axios.delete(`${config.SOILCARE_API}/test-results/${id}`, {
        headers: {
          "X-Auth-Token": token
        }
      });
      navigate(-1)
    }
  }

  if (isLoading) {
    return (<div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: "20px",
      }}
    >
      <Spinner />
    </div>);
  }

  return (<>
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {!isMatch && <Typography variant='h4'>{reportDetails.refNo}</Typography>}
          <div>
            {user.role === "SUPER_USER" && (
              <Link
                to={"/report/edit/" + reportDetails.id}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{ marginRight: "5px", mb: 1 }}
                  startIcon={<EditOutlined />}
                  color="primary"
                  variant="outlined"
                >
                  Edit
                </Button>
              </Link>
            )
            }
            {user.role === "SUPER_USER" && (
              <Button
                sx={{ marginRight: "5px", mb: 1 }}
                startIcon={<EditOutlined />}
                color="error"
                variant="outlined"
                onClick={() => deleteRepost(reportDetails.id)}
              >
                Delete
              </Button>
            )
            }

            <LoadingButton
              loading={loading}
              sx={{ marginRight: "5px", mb: 1 }}
              startIcon={<Download />}
              color="primary"
              variant="outlined"
              onClick={DownloadReport}
            >
              Report
            </LoadingButton>
          </div>
        </div>
      </Grid>
    </Grid>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Test Details" {...a11yProps(0)} />
        <Tab label="Parameter" {...a11yProps(1)} />
        {reportDetails.location && <Tab label="Map view" {...a11yProps(2)} />}
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <p>
            <strong style={{ ...(!isMatch && { width: "200px", display: "inline-block" }) }}>Ref.
              No.:</strong> {isMatch && <br></br>} {reportDetails.refNo}

          </p>
          <p>
            <strong style={{ ...(!isMatch && { width: "200px", display: "inline-block" }) }}>Customer
              Name: </strong> {isMatch && <br></br>}

            <Link
              to={"/customer/view/" + reportDetails.customerId}
              style={{ textDecoration: "none" }}
            >
              <Typography sx={{ display: "inline" }} color="primary">
                {customer?.fullName}
              </Typography>
            </Link>
          </p>

          <p>
            <strong style={{
              ...(!isMatch && {
                width: "200px", display: "inline-block"
              })
            }}>Location: </strong>{isMatch && <br></br>}
            {reportDetails.location}
          </p>
          <p>
            <strong style={{ ...(!isMatch && { width: "200px", display: "inline-block" }) }}>Land area
              size: </strong>{isMatch && <br></br>}
            {reportDetails.landAreaSize}
          </p>
          <p>
            <strong style={{ ...(!isMatch && { width: "200px", display: "inline-block" }) }}>Tested
              At: </strong>{isMatch && <br></br>}
            {reportDetails.additionalParameters !== undefined && formatDateTime(reportDetails?.additionalParameters?.testedAt)}
          </p>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <p>
            <strong style={{
              ...(!isMatch && {
                width: "200px", display: "inline-block"
              })
            }}>State: </strong>{isMatch && <br></br>}
            {reportDetails.state}
          </p>
          <p>
            <strong style={{
              ...(!isMatch && {
                width: "200px", display: "inline-block"
              })
            }}>District: </strong>{isMatch && <br></br>}
            {reportDetails.district}
          </p>
          <p>
            <strong style={{
              ...(!isMatch && {
                width: "200px", display: "inline-block"
              })
            }}>Subdistrict: </strong>{isMatch && <br></br>}
            {reportDetails.subdistrict}
          </p>
          <p>
            <strong style={{
              ...(!isMatch && {
                width: "200px", display: "inline-block"
              })
            }}>Village: </strong>{isMatch && <br></br>}
            {reportDetails.village}
          </p>
          <p>
            <strong style={{
              ...(!isMatch && {
                width: "200px",
                display: "inline-block"
              })
            }}>Remarks: </strong>{isMatch && <br></br>}
            {reportDetails.remarks}
          </p>
        </Grid>
      </Grid>
    </TabPanel>
    <TabPanel value={value} index={1}>
      {isMatch ? (reportDetails.samples !== undefined && DisplaySampleInCard({
        data: reportDetails.samples[0], dataUnits: dataUnits,
      })) : (<div style={{ marginTop: "15px" }}>
        {reportDetails.samples !== undefined && DisplaySample({
          data: reportDetails.samples[0], dataUnits: dataUnits, isTea: true
        })}
      </div>)}
    </TabPanel>
    {reportDetails.location && <TabPanel value={value} index={2}>
      {reportDetails?.location?.length > 0 ? <ReportOnMap data={{ data: [reportDetails], dataUnits: dataUnits }} /> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>No Data Available</Box>}
    </TabPanel>}
  </>);
};
export default TeaReportDetails;
