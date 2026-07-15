import { BrowserRouter, Routes, Route } from "react-router-dom";

// =======================
// AUTH PAGES
// =======================

import Login from "./pages/Login";
import Register from "./pages/Register";

// =======================
// ADMIN PAGES
// =======================

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Municipalities from "./pages/Municipalities";
import BusinessTypes from "./pages/BusinessTypes";
import Businesses from "./pages/Businesses";
import PendingBusinesses from "./pages/PendingBusinesses";
import MonthlyTaxes from "./pages/MonthlyTaxes";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";

// =======================
// BUSINESS OWNER PAGES
// =======================

import BusinessDashboard from "./pages/BusinessDashboard";
import MyBusiness from "./pages/MyBusiness";
import BusinessMonthlyTaxes from "./pages/BusinessMonthlyTaxes";
import BusinessPayments from "./pages/BusinessPayments";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =======================
                    AUTH ROUTES
                ======================= */}

                <Route path="/" element={<Login />} />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* =======================
                    ADMIN ROUTES
                ======================= */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/users"
                    element={<Users />}
                />

                <Route
                    path="/municipalities"
                    element={<Municipalities />}
                />

                <Route
                    path="/business-types"
                    element={<BusinessTypes />}
                />

                <Route
                    path="/businesses"
                    element={<Businesses />}
                />

                <Route
                    path="/pending-businesses"
                    element={<PendingBusinesses />}
                />

                <Route
                    path="/monthly-taxes"
                    element={<MonthlyTaxes />}
                />

                <Route
                    path="/payments"
                    element={<Payments />}
                />

                <Route
                    path="/reports"
                    element={<Reports />}
                />

                {/* =======================
                    BUSINESS OWNER ROUTES
                ======================= */}

                <Route
                    path="/business"
                    element={<BusinessDashboard />}
                />

                <Route
                    path="/my-business"
                    element={<MyBusiness />}
                />

                <Route
                    path="/business-monthly-taxes"
                    element={<BusinessMonthlyTaxes />}
                />

                <Route
                    path="/business-payments"
                    element={<BusinessPayments />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;