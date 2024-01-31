import React from "react";
import ReportDetails from "../components/TestReports/ReportDetails";
import Container from "../components/Container";
import {useParams} from "react-router-dom";
function ReportDetailsPage() {
    const {id} = useParams();
    return (
        <Container>
            <ReportDetails id={id} />
        </Container>
    );
}

export default ReportDetailsPage;
