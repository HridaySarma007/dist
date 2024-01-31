import React from "react";
import GenerateRecommForm from "../components/TestReports/GenerateRecommForm";
import Container from "../components/Container";
import {useParams} from "react-router-dom";
import Breadcrumb from "../components/Breadcrumbs";

function GenerateRecommendation() {
    const {id} = useParams();
    return (
        <Container>
            <Breadcrumb items={["Dashboard", "Reports", "Recommendation"]} />
            <GenerateRecommForm id={id} />
        </Container>
    );
}

export default GenerateRecommendation;
