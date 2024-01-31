import React from "react";
import {useParams} from "react-router-dom";
import Container from "../components/Container";
import CustomerReportDetails from "../components/CustomerReports/CustomerReportDetails";
function CustomerReportDetailPage() {
  const { id } = useParams();

  return (
      <Container>
        <CustomerReportDetails id={id} />
      </Container>
  );
}

export default CustomerReportDetailPage;
