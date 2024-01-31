import React from "react";
import {useParams} from "react-router-dom";
import Container from "../components/Container";
import CustomerTeaReportDetails from "../components/CustomerReports/CustomerTeaReportDetails";
function CustomerTeaReportDetailPage() {
    const { id } = useParams();

    return (
        <Container>
            <CustomerTeaReportDetails id={id} />
        </Container>
    );
}

export default CustomerTeaReportDetailPage;
