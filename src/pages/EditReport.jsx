import React from "react";
import EditReportForm from "../components/TestReports/EditTestReportForm";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";
import {useParams} from "react-router-dom";

function EditReport() {
    const {id} = useParams();

    return (
        <Container>
            <Breadcrumb items={["Dashboard", "Reports", "Edit report"]} />
            <EditReportForm id={id} />
        </Container>
    );
}

export default EditReport;
