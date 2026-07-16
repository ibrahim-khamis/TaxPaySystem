import { useEffect, useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
import DashboardCard from "../components/DashboardCard";
import BASE_URL from "../services/api";
import "../css/dashboard.css";

function BusinessDashboard() {

    const token = localStorage.getItem("token");

    const [dashboard, setDashboard] = useState({

        businessName: "",

        monthlyTax: 0,

        paymentStatus: "",

        totalPaid: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await fetch(

                `${BASE_URL}/businesses/dashboard`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if(response.ok){

                const data = await response.json();

                setDashboard(data);

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <BusinessLayout>

            <h1>Business Dashboard</h1>

            <p>

                Welcome to Municipal Tax Management System

            </p>

            <div className="dashboard-grid">

                <DashboardCard

                    title="My Business"

                    value={dashboard.businessName}

                />

                <DashboardCard

                    title="Monthly Tax"

                    value={`TZS ${dashboard.monthlyTax.toLocaleString()}`}

                />

                <DashboardCard

                    title="Payment Status"

                    value={dashboard.paymentStatus}

                />

            </div>

        </BusinessLayout>

    );

}

export default BusinessDashboard;