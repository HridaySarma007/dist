import React from "react";
import Container from "../components/Container";
import {useParams} from "react-router-dom";
import TeaReportDetails from "../components/TestReports/TeaReportsDetails";
function TeaReportDetailsPage() {
    const {id} = useParams();
    return (
        <Container>
            <TeaReportDetails id={id} />
        </Container>
    );
}

export default TeaReportDetailsPage;
