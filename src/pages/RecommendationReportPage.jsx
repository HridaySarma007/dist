import React from "react";
import RecommendationReport from "../components/TestReports/RecommendationReport";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumbs";

const RecommendationReportPage = () => {
  const { id, corp, target, method } = useParams();
  return (

      <Container>
        <Breadcrumb items={["Dashboard", "Reports", "Recommendation"]} />
        <RecommendationReport
          id={id}
          corp={corp}
          target={target}
          method={method}
        />
      </Container>
  );
};

export default RecommendationReportPage;
