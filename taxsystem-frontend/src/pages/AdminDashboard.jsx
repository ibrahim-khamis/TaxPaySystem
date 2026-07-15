import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import BASE_URL from "../services/api";
import "../css/dashboard.css";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({

        totalUsers: 0,
        totalBusinesses: 0,
        activeBusinesses: 0,
        pendingBusinesses: 0,
        rejectedBusinesses: 0,
        totalMonthlyTaxes: 0,
        paidTaxes: 0,
        unpaidTaxes: 0,
        overdueTaxes: 0,
        totalRevenue: 0

    });

    const token = localStorage.getItem("token");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/dashboard`,
                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }
            );

            const data = await response.json();

            setDashboard(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <h1>Dashboard</h1>

            <p>Welcome Administrator</p>

            <div className="dashboard-grid">

                <DashboardCard
                    title="Total Users"
                    value={dashboard.totalUsers}
                />

                <DashboardCard
                    title="Businesses"
                    value={dashboard.totalBusinesses}
                />

                <DashboardCard
                    title="Pending Businesses"
                    value={dashboard.pendingBusinesses}
                />

                <DashboardCard
                    title="Active Businesses"
                    value={dashboard.activeBusinesses}
                />

                <DashboardCard
                    title="Rejected Businesses"
                    value={dashboard.rejectedBusinesses}
                />

                <DashboardCard
                    title="Monthly Taxes"
                    value={dashboard.totalMonthlyTaxes}
                />

                <DashboardCard
                    title="Paid Taxes"
                    value={dashboard.paidTaxes}
                />

                <DashboardCard
                    title="Unpaid Taxes"
                    value={dashboard.unpaidTaxes}
                />

                <DashboardCard
                    title="Overdue Taxes"
                    value={dashboard.overdueTaxes}
                />

                <DashboardCard
                    title="Revenue"
                    value={`TZS ${dashboard.totalRevenue.toLocaleString()}`}
                />

            </div>

        </Layout>

    );

}

export default AdminDashboard;