import React from "react";
import { lazy, Suspense } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

//import Dashboard from "./components/Dashboard";
import IndexPage from "./pages/IndexPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/auth/LoginIndex";
import CustomerLogin from "./pages/auth/CustomerLogin";
import OtpVerification from "./pages/auth/OtpForm";
import CustomerDashboard from "./pages/CustomerDashboardPage";
import CustomerReports from "./pages/CustomerReportsPage";
import CustomerReportDetails from "./pages/CustomerReportDetailPage";
import CustomerReportOnMap from "./pages/CustomerReportOnMapPage";
import CustomerProfile from "./pages/CustomerProfilePage";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import AddUser from "./pages/AddUser";
import AddCustomer from "./pages/AddCustomer";
import ViewCustomer from "./pages/ViewCustomerPage";
import EditCustomer from "./pages/EditCustomer";
import EditUser from "./pages/EditUser";
import ViewUser from "./pages/ViewUserPage";
import ChangePassword from "./pages/ChangePasswordPage";
import FarmerReports from "./pages/FarmersReportsMainPage";
import TeaReports from "./pages/TeaReportsMainPage";
import ReportDetailsPage from "./pages/ReportDetailsPage";
import GenerateRecommendation from "./pages/GenerateRecommendation";
import RecommendationReport from "./pages/RecommendationReportPage";
import EditReport from "./pages/EditReport";
import AddTestReport from "./pages/AddTestReport";
import CustomerRoute from "./utils/CustomerRoute";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Page404 from "./pages/Page404";
import Page500 from "./pages/Page500";
import CustomerPage404 from "./pages/Customer404Page";
import CustomerPage500 from "./pages/Customer500Page";

import ReportOnMap from "./pages/ReportOnMapPage";
import NotFound from "./pages/NotFound";
import TeaReportDetailsPage from "./pages/TeaReportDetailsPage";
import CustomerTeaReportDetails from "./components/CustomerReports/CustomerTeaReportDetails";
import CustomerTeaReportDetailsPage from "./pages/CustomerTeaReportDetailsPage";
import SamplePage from "./pages/SamplePage";
import SampleList from "./pages/SampleList";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={<LoginPage/>} />
                <Route element={<PublicRoute />}>
                    <Route exact path="/" element={<IndexPage/>} />
                    <Route path="/contact" element={<ContactPage/>} />

                    <Route exact path="/customer-login" element={<CustomerLogin/>} />
                    <Route exact path="/otp-verification" element={<OtpVerification/>} />
                    <Route exact path="/sample-collection" element={<SamplePage/>} />
                    <Route path="*" exact={true} element={<NotFound/>} />
                </Route>

                <Route element={<CustomerRoute />}>
                    <Route
                        path="/customer-dashboard"
                        element={<CustomerReports/>}
                    />
                    <Route
                        path="/customer-report/view/:id"
                        element={<CustomerReportDetails/>}
                    />
                    <Route
                        path="/customer-tea-report/view/:id"
                        element={<CustomerTeaReportDetailsPage/>}
                    />
                    <Route
                        path="/customer-report/mapview"
                        element={<CustomerReportOnMap/>}
                    />
                    <Route
                        path="/profile"
                        element={<CustomerProfile/>}
                    />
                    <Route
                        path="/404"
                        element={<CustomerPage404/>}
                    />
                </Route>
                {/* <CustomerRoute path="*" exact={true} component={CustomerPage404} />*/}

                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Home/>} />
                    <Route path="/reports" element={<FarmerReports/>} />
                    <Route path="/tea_reports" element={<TeaReports/>} />
                    <Route path="/report/view/:id" element={<ReportDetailsPage/>} />
                    <Route path="/tea_report/view/:id" element={<TeaReportDetailsPage/>} />
                    <Route path="/report/mapview" element={<ReportOnMap/>} />
                    <Route path="/report/edit/:id" element={<EditReport/>} />
                    <Route
                        path="/recommendation/test/:id"
                        element={<GenerateRecommendation/>}
                    />
                    <Route
                        path="/nutrient-requirements/test/:id/:corp/:target/:method"
                        element={<RecommendationReport/>}
                    />
                    <Route path="/report/add" element={<AddTestReport/>} />
                    <Route path="/users" element={<Users/>} />
                    <Route path="/user/add" element={<AddUser/>} />
                    <Route path="/user/view/:id" element={<ViewUser/>} />
                    <Route path="/user/edit/:id" element={<EditUser/>} />
                    <Route
                        path="/user/change-password/:id"
                        element={<ChangePassword/>}
                    />
                    <Route path="/customers" element={<Customers/>} />
                    <Route path="/customer/add" element={<AddCustomer/>} />
                    <Route path="/customer/view/:id" element={<ViewCustomer/>} />
                    <Route path="/customer/edit/:id" element={<EditCustomer/>} />
                    <Route path="/404" element={<Page404/>} />
                    <Route path="/500" element={<Page500/>} />
                    <Route path="*" exact={true} element={<Page404/>} />
                    <Route path="/samples" element={<SampleList/>} />
                </Route>

                

            </Routes>
        </Router>
    );
}

export default App;
